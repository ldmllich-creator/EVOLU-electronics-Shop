/* ============================================
   EVOLU Voice Bot Widget — GAS Proxy + Live Voice
   Uses Google Apps Script as backend for OpenAI chat
   Logs all conversations to Google Sheets
   ============================================ */

(function () {
    'use strict';

    // --- Google Apps Script URL (EVOLU Bot — deployed web app) ---
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbxIqInwy_p6-KtgUhseWuzABFTOjNXwIoRK6fjGzdPzdYwFKA_3hgFrC9-DIImvRksQ/exec';

    let chatHistory = [];
    let sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    let isOpen = false;
    let isListening = false;
    let isProcessing = false;
    let recognition = null;
    let currentLang = document.documentElement.lang || 'ru';

    // --- EVOLU Knowledge Base (embedded in system prompt) ---
    function getSystemPrompt(lang) {
        const base = `You are Eva (Эва), a virtual consultant for EVOLU electronics — a European medical device company based in Latvia.

KNOWLEDGE BASE:
Products:
- SUPER CAR: compressor inhaler shaped like a racing car, for children, 49 euros 95 cents (was 78 euros 25 cents), minus 36 percent
- NANO AIR PRO: portable mesh nebulizer, ultrasonic, USB charging, silent, 99 euros (was 124 euros 55 cents)
- NANO AIR MINI: ultra-compact mesh nebulizer, 90 grams, rechargeable, 72 euros 87 cents (was 121 euros 45 cents), minus 40 percent
- NANO AIR: portable mesh nebulizer, quiet, one-button, 70 euros 62 cents (was 108 euros 65 cents), minus 35 percent
- UNIVERSAL: compressor nebulizer for whole family, adjustable, 43 euros 44 cents (was 62 euros 5 cents), minus 30 percent
- INTELLIGENT: automatic blood pressure monitor, large display, 2 times 60 measurements memory, arrhythmia indicator, 64 euros 85 cents
- AUTOMATIC: compact automatic blood pressure monitor, one-button, 36 euros 45 cents
- NON CONTACT 3-in-1: infrared non-contact thermometer, 1 second measurement, body, surface and room modes, 37 euros 95 cents (was 58 euros 45 cents), minus 35 percent
- SOFT: digital thermometer, flexible tip, waterproof, 5 euros 99 cents (was 6 euros 65 cents)
- SIMPLE: basic digital thermometer, 60 seconds, 4 euros 91 cents (was 5 euros 45 cents)
- Pulse Oximeter: fingertip oxygen saturation and pulse measurement, OLED display, 8 seconds, 47 euros 85 cents

Product instruction manuals available (PDF):
- SUPER CAR nebulizer instruction manual
- NANO AIR PRO nebulizer instruction manual
- NANO AIR MINI nebulizer instruction manual
- NANO AIR nebulizer instruction manual
- UNIVERSAL compressor nebulizer instruction manual
- INTELLIGENT blood pressure monitor instruction manual
- AUTOMATIC blood pressure monitor instruction manual
- NON CONTACT infrared thermometer instruction manual
- SOFT digital thermometer instruction manual
- SIMPLE digital thermometer instruction manual
- Pulse Oximeter instruction manual
When users ask detailed technical questions about a specific product, mention that a detailed instruction manual is available for download on our website.

Company info:
- Website: evolu.lv
- Phone: plus 371 20 38 70 70
- Email: info at evolu.lv
- All devices are CE certified
- Warranty: 2 plus years
- Delivery: free to parcel lockers in Latvia for orders over 25 euros, 2 to 3 business days
- Spare parts available: masks, tubes, filters, mouthpieces, blood pressure cuffs

Care tips:
- Nebulizers: rinse mask and medication cup after each use, disinfect weekly, replace filters every 3 to 6 months
- Blood pressure monitors: measure at rest, sitting, cuff at heart level, no coffee 30 minutes before
- Thermometers: wipe with alcohol, non-contact hold 3 to 5 centimeters from forehead
- Store at 10 to 40 degrees Celsius, humidity below 85 percent, replace batteries on time

RULES:
1. Be helpful, friendly, and concise
2. Never invent products that do not exist in the knowledge base
3. If asked about something not in the knowledge base, suggest contacting info at evolu.lv or calling plus 371 20 38 70 70
4. Do NOT use emojis in your responses
5. Keep responses under 150 words
6. When mentioning prices, always say them as words: for example say 'forty nine euros ninety five cents' not '49.95'
7. When users ask technical questions about a product, mention that a detailed instruction manual PDF is available for download on the product page`;

        const langInstructions = {
            ru: `\n8. RESPOND ONLY IN RUSSIAN. Always speak Russian regardless of what language the user writes in.
9. ALWAYS write out ALL numbers, prices and percentages as WORDS in Russian. For example: write "сорок девять евро девяносто пять центов" not "€49,95". Write "минус тридцать шесть процентов" not "-36%". Write "плюс три семь один, два ноль три восемь семь ноль семь ноль" for phone numbers.`,
            en: `\n8. RESPOND ONLY IN ENGLISH. Always speak English regardless of what language the user writes in.
9. ALWAYS write out ALL numbers, prices and percentages as WORDS in English. For example: write "forty-nine euros and ninety-five cents" not "€49.95". Write "minus thirty-six percent" not "-36%". Write phone numbers digit by digit.`,
            lv: `\n8. RESPOND ONLY IN LATVIAN (latviešu valodā). Always speak Latvian regardless of what language the user writes in.
9. ALWAYS write out ALL numbers, prices and percentages as WORDS in Latvian. For example: write "četrdesmit deviņi eiro un deviņdesmit pieci centi" not "€49,95". Write "mīnus trīsdesmit seši procenti" not "-36%". Write phone numbers digit by digit.`
        };

        return base + (langInstructions[lang] || langInstructions.ru);
    }

    // Detect current language from page
    function detectLang() {
        const activeBtn = document.querySelector('.lang-btn.active');
        if (activeBtn) {
            currentLang = activeBtn.dataset.lang || 'ru';
        }
        return currentLang;
    }

    // Translations for widget UI
    const widgetTexts = {
        ru: {
            title: 'Эва — консультант EVOLU',
            subtitle: 'Спросите о нашей продукции',
            placeholder: 'Введите вопрос...',
            greeting: 'Привет! Я Эва — консультант EVOLU. Помогу выбрать прибор, расскажу о ценах и доставке. Напишите вопрос или нажмите 🎙 для голосового общения!',
            listening: 'Слушаю...',
            thinking: 'Думаю...',
            error: 'Извините, произошла ошибка. Попробуйте ещё раз.',
            micTooltip: 'Нажмите для голосового ввода',
            hint: '💬 Задайте вопрос Эве!'
        },
        en: {
            title: 'Eva — EVOLU Consultant',
            subtitle: 'Ask about our products',
            placeholder: 'Type your question...',
            greeting: 'Hi! I\'m Eva — EVOLU consultant. I\'ll help you choose the right device and answer your questions. Type a message or tap 🎙 to talk!',
            listening: 'Listening...',
            thinking: 'Thinking...',
            error: 'Sorry, an error occurred. Please try again.',
            micTooltip: 'Click for voice input',
            hint: '💬 Ask Eva a question!'
        },
        lv: {
            title: 'Eva — EVOLU konsultante',
            subtitle: 'Jautājiet par mūsu produktiem',
            placeholder: 'Ievadiet jautājumu...',
            greeting: 'Sveiki! Esmu Eva — EVOLU konsultante. Palīdzēšu izvēlēties ierīci un atbildēšu uz jautājumiem. Rakstiet vai nospiediet 🎙 lai runātu!',
            listening: 'Klausos...',
            thinking: 'Domāju...',
            error: 'Atvainojiet, radās kļūda. Lūdzu, mēģiniet vēlreiz.',
            micTooltip: 'Nospiediet balss ievadei',
            hint: '💬 Uzdodiet jautājumu Evai!'
        }
    };

    function t(key) {
        const lang = detectLang();
        return (widgetTexts[lang] && widgetTexts[lang][key]) || widgetTexts.ru[key];
    }

    // ---- Create Widget DOM ----
    function createWidget() {
        const style = document.createElement('style');
        style.textContent = `
            .vw-fab {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background: linear-gradient(135deg, #009a96, #00b8a9);
                border: none;
                cursor: pointer;
                box-shadow: 0 6px 24px rgba(0,154,150,0.4);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                animation: vw-pulse 2s infinite;
            }
            .vw-fab:hover { transform: scale(1.1); box-shadow: 0 8px 32px rgba(0,154,150,0.6); }
            .vw-fab svg { width: 28px; height: 28px; fill: white; }
            .vw-fab.open { animation: none; }
            @keyframes vw-pulse {
                0%, 100% { box-shadow: 0 6px 24px rgba(0,154,150,0.4); }
                50% { box-shadow: 0 6px 24px rgba(0,154,150,0.7), 0 0 0 12px rgba(0,154,150,0.1); }
            }
            .vw-hint {
                position: fixed;
                bottom: 36px;
                right: 100px;
                background: white;
                color: #1a1a1a;
                padding: 10px 18px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                font-family: 'Inter', sans-serif;
                box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                z-index: 9998;
                white-space: nowrap;
                cursor: pointer;
                opacity: 0;
                transform: translateX(10px);
                transition: opacity 0.4s ease, transform 0.4s ease;
                border: 1px solid rgba(0,154,150,0.15);
            }
            .vw-hint.show { opacity: 1; transform: translateX(0); }
            .vw-hint::after {
                content: '';
                position: absolute;
                right: -6px;
                top: 50%;
                transform: translateY(-50%) rotate(45deg);
                width: 12px;
                height: 12px;
                background: white;
                border-right: 1px solid rgba(0,154,150,0.15);
                border-top: 1px solid rgba(0,154,150,0.15);
            }
            .vw-panel {
                position: fixed;
                bottom: 100px;
                right: 24px;
                width: 380px;
                max-height: 560px;
                background: #ffffff;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                z-index: 9998;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .vw-panel.open {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: auto;
            }
            .vw-header {
                background: linear-gradient(135deg, #009a96, #00b8a9);
                color: white;
                padding: 18px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .vw-header-avatar {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.4rem;
                flex-shrink: 0;
            }
            .vw-header-info h4 { font-size: 0.95rem; font-weight: 700; margin: 0; }
            .vw-header-info p { font-size: 0.75rem; opacity: 0.8; margin: 2px 0 0; }
            .vw-header-close {
                margin-left: auto;
                background: none;
                border: none;
                color: white;
                font-size: 1.4rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s;
                padding: 4px;
            }
            .vw-header-close:hover { opacity: 1; }
            .vw-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                min-height: 280px;
                max-height: 360px;
                background: #f8fafc;
            }
            .vw-msg {
                max-width: 85%;
                padding: 10px 14px;
                border-radius: 14px;
                font-size: 0.88rem;
                line-height: 1.5;
                word-wrap: break-word;
                animation: vw-fadeIn 0.3s ease;
            }
            @keyframes vw-fadeIn {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .vw-msg.bot {
                background: white;
                color: #1e293b;
                align-self: flex-start;
                border: 1px solid #e2e8f0;
                border-bottom-left-radius: 4px;
            }
            .vw-msg.user {
                background: linear-gradient(135deg, #009a96, #00b8a9);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            .vw-msg.status {
                background: transparent;
                color: #94a3b8;
                align-self: center;
                font-size: 0.8rem;
                font-style: italic;
                padding: 4px 10px;
            }
            .vw-typing {
                display: flex;
                gap: 4px;
                padding: 10px 14px;
                align-self: flex-start;
                background: white;
                border-radius: 14px;
                border: 1px solid #e2e8f0;
                border-bottom-left-radius: 4px;
            }
            .vw-typing span {
                width: 8px;
                height: 8px;
                background: #94a3b8;
                border-radius: 50%;
                animation: vw-bounce 1.4s ease-in-out infinite;
            }
            .vw-typing span:nth-child(2) { animation-delay: 0.2s; }
            .vw-typing span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes vw-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
            }
            .vw-input-area {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 14px;
                border-top: 1px solid #e2e8f0;
                background: white;
            }
            .vw-input {
                flex: 1;
                border: 1px solid #e2e8f0;
                border-radius: 24px;
                padding: 10px 16px;
                font-size: 0.88rem;
                font-family: inherit;
                outline: none;
                transition: border-color 0.2s;
                background: #f8fafc;
            }
            .vw-input:focus { border-color: #009a96; background: white; }
            .vw-input::placeholder { color: #94a3b8; }
            .vw-mic-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background: #f1f5f9;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            .vw-mic-btn:hover { background: #e2e8f0; }
            .vw-mic-btn.listening {
                background: #dc2626;
                animation: vw-pulse-red 1s infinite;
            }
            .vw-mic-btn svg { width: 18px; height: 18px; fill: #475569; }
            .vw-mic-btn.listening svg { fill: white; }
            @keyframes vw-pulse-red {
                0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.5); }
                50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
            }
            .vw-send-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, #009a96, #00b8a9);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            .vw-send-btn:hover { transform: scale(1.05); }
            .vw-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
            .vw-send-btn svg { width: 18px; height: 18px; fill: white; }
            .vw-mute-btn {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                border: none;
                background: #f1f5f9;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                flex-shrink: 0;
            }
            .vw-mute-btn:hover { background: #e2e8f0; }
            .vw-mute-btn.muted { background: #fee2e2; }
            .vw-mute-btn svg { width: 16px; height: 16px; fill: #475569; }
            .vw-mute-btn.muted svg { fill: #dc2626; }
            @media (max-width: 480px) {
                .vw-panel {
                    right: 8px;
                    left: 8px;
                    bottom: 80px;
                    width: auto;
                    max-height: 70vh;
                }
            }
        `;
        document.head.appendChild(style);

        const fab = document.createElement('button');
        fab.className = 'vw-fab';
        fab.id = 'vwFab';
        fab.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 1c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.814 3.889 6.17-.12.901-.587 3.357-.672 3.88 0 0-.014.11.058.152.073.043.16.022.16.022.222-.031 2.577-1.677 3.644-2.455.295.042.598.064.908.074L12 16c4.97 0 9-3.533 9-7.885C21 4.185 16.97 1 12 1z"/></svg>`;
        fab.title = t('micTooltip');
        document.body.appendChild(fab);

        const panel = document.createElement('div');
        panel.className = 'vw-panel';
        panel.id = 'vwPanel';
        panel.innerHTML = `
            <div class="vw-header">
                <div class="vw-header-avatar">🤖</div>
                <div class="vw-header-info">
                    <h4>${t('title')}</h4>
                    <p>● Online — ${t('subtitle')}</p>
                </div>
                <button class="vw-header-close" id="vwClose">✕</button>
            </div>
            <div class="vw-messages" id="vwMessages"></div>
            <div class="vw-input-area">
                <button class="vw-mute-btn muted" id="vwMute" title="Voice on/off">
                    <svg viewBox="0 0 24 24" id="vwMuteIcon"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
                </button>
                <button class="vw-mic-btn" id="vwMic" title="${t('micTooltip')}">
                    <svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>
                </button>
                <input type="text" class="vw-input" id="vwInput" placeholder="${t('placeholder')}" autocomplete="off">
                <button class="vw-send-btn" id="vwSend">
                    <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                </button>
            </div>
        `;
        document.body.appendChild(panel);

        // Create hint tooltip
        const hint = document.createElement('div');
        hint.className = 'vw-hint';
        hint.id = 'vwHint';
        hint.textContent = t('hint');
        hint.addEventListener('click', () => {
            hint.classList.remove('show');
            if (!isOpen) togglePanel();
        });
        document.body.appendChild(hint);

        // Show hint after 3 seconds, hide after 10 seconds
        setTimeout(() => { if (!isOpen) hint.classList.add('show'); }, 3000);
        setTimeout(() => { hint.classList.remove('show'); }, 13000);

        fab.addEventListener('click', () => {
            togglePanel();
            hint.classList.remove('show');
        });
        document.getElementById('vwClose').addEventListener('click', togglePanel);
        document.getElementById('vwSend').addEventListener('click', sendMessage);
        document.getElementById('vwInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        document.getElementById('vwMic').addEventListener('click', toggleMic);
        document.getElementById('vwMute').addEventListener('click', toggleMute);

        setTimeout(() => { addMessage('bot', t('greeting'), false); }, 500);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                setTimeout(() => {
                    const newLang = btn.dataset.lang || 'ru';
                    if (newLang !== currentLang) {
                        currentLang = newLang;
                        updateWidgetTexts();
                        chatHistory = [];
                        const container = document.getElementById('vwMessages');
                        if (container) {
                            container.innerHTML = '';
                            addMessage('bot', t('greeting'), true);
                        }
                    }
                }, 100);
            });
        });
    }

    function updateWidgetTexts() {
        const headerTitle = document.querySelector('.vw-header-info h4');
        const headerSub = document.querySelector('.vw-header-info p');
        const input = document.getElementById('vwInput');
        const mic = document.getElementById('vwMic');
        if (headerTitle) headerTitle.textContent = t('title');
        if (headerSub) headerSub.innerHTML = `● Online — ${t('subtitle')}`;
        if (input) input.placeholder = t('placeholder');
        if (mic) mic.title = t('micTooltip');
    }

    function togglePanel() {
        isOpen = !isOpen;
        const panel = document.getElementById('vwPanel');
        const fab = document.getElementById('vwFab');
        panel.classList.toggle('open', isOpen);
        fab.classList.toggle('open', isOpen);
        if (isOpen) {
            fab.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
            setTimeout(() => document.getElementById('vwInput').focus(), 300);
        } else {
            fab.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 1c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.814 3.889 6.17-.12.901-.587 3.357-.672 3.88 0 0-.014.11.058.152.073.043.16.022.16.022.222-.031 2.577-1.677 3.644-2.455.295.042.598.064.908.074L12 16c4.97 0 9-3.533 9-7.885C21 4.185 16.97 1 12 1z"/></svg>`;
        }
    }

    function addMessage(type, text, autoSpeak) {
        const container = document.getElementById('vwMessages');
        const msg = document.createElement('div');
        msg.className = `vw-msg ${type}`;
        msg.textContent = text;

        container.appendChild(msg);
        container.scrollTop = container.scrollHeight;

        // Auto-speak bot messages
        if (type === 'bot' && autoSpeak !== false) {
            speakText(text);
        }
    }

    function showTyping() {
        const container = document.getElementById('vwMessages');
        const typing = document.createElement('div');
        typing.className = 'vw-typing';
        typing.id = 'vwTyping';
        typing.innerHTML = '<span></span><span></span><span></span>';
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('vwTyping');
        if (typing) typing.remove();
    }

    // ---- Send Message via Google Apps Script Proxy ----
    async function sendMessage() {
        const input = document.getElementById('vwInput');
        const text = input.value.trim();
        if (!text || isProcessing) return;

        input.value = '';
        addMessage('user', text);
        isProcessing = true;
        showTyping();

        const lang = detectLang();
        const systemPrompt = getSystemPrompt(lang);

        try {
            // Send to Google Apps Script proxy which calls OpenAI server-side
            // Content-Type: text/plain avoids CORS preflight (simple request)
            const response = await fetch(GAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body: JSON.stringify({
                    action: 'chat',
                    message: text,
                    history: chatHistory.slice(-10),
                    lang: lang,
                    sessionId: sessionId,
                    systemPrompt: systemPrompt
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            hideTyping();
            const reply = data.reply || '';
            addMessage('bot', reply, true);

            chatHistory.push({ role: 'user', content: text });
            chatHistory.push({ role: 'assistant', content: reply });

            if (chatHistory.length > 20) {
                chatHistory = chatHistory.slice(-20);
            }

        } catch (err) {
            hideTyping();
            console.error('Chat error:', err);

            const fallbackMessages = {
                ru: 'К сожалению, произошла ошибка. Пожалуйста, свяжитесь с нами по телефону +371 20387070 или email info@evolu.lv',
                en: 'Sorry, an error occurred. Please contact us at +371 20387070 or info@evolu.lv',
                lv: 'Atvainojiet, radās kļūda. Lūdzu, sazinieties ar mums pa tālruni +371 20387070 vai info@evolu.lv'
            };
            addMessage('bot', fallbackMessages[lang] || fallbackMessages.ru);
        }

        isProcessing = false;
    }


    // ---- Voice Mode Toggle ----
    let voiceEnabled = false;

    function toggleMute() {
        voiceEnabled = !voiceEnabled;
        const btn = document.getElementById('vwMute');
        const icon = document.getElementById('vwMuteIcon');
        if (btn) btn.classList.toggle('muted', !voiceEnabled);
        if (icon) {
            icon.innerHTML = voiceEnabled
                ? '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>'
                : '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        }
        if (!voiceEnabled) stopTTS();
    }

    // ---- Natural TTS via OpenAI API (through GAS proxy) ----
    let currentAudio = null;
    let ttsPlaying = false;

    function cleanTextForSpeech(text, lang) {
        let cleaned = text;
        // Remove emojis
        cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, '');

        // Language-specific number words
        const numWords = {
            ru: { euro: 'евро', cents: 'центов', percent: 'процентов', minus: 'минус', times: 'на', plus: 'плюс', degrees: 'градусов Цельсия' },
            en: { euro: 'euros', cents: 'cents', percent: 'percent', minus: 'minus', times: 'times', plus: 'plus', degrees: 'degrees Celsius' },
            lv: { euro: 'eiro', cents: 'centi', percent: 'procenti', minus: 'mīnus', times: 'reizes', plus: 'plus', degrees: 'grādi pēc Celsija' }
        };
        const w = numWords[lang] || numWords.ru;

        // Convert euro prices: €49,95 or €49.95
        cleaned = cleaned.replace(/€\s*(\d+)[,\.](\d+)/g, `$1 ${w.euro} $2 ${w.cents}`);
        cleaned = cleaned.replace(/€\s*(\d+)/g, `$1 ${w.euro}`);
        // Convert percentages: -36%
        cleaned = cleaned.replace(/-(\d+)%/g, `${w.minus} $1 ${w.percent}`);
        cleaned = cleaned.replace(/(\d+)%/g, `$1 ${w.percent}`);
        // Convert × symbol
        cleaned = cleaned.replace(/(\d+)×(\d+)/g, `$1 ${w.times} $2`);
        // Convert phone numbers: add spaces between digits
        cleaned = cleaned.replace(/\+371\s*(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/g, `${w.plus} 3 7 1, $1 $2 $3 $4 $5 $6 $7 $8`);
        // Convert degree symbols
        cleaned = cleaned.replace(/°C/g, ` ${w.degrees}`);
        // Clean up multiple spaces
        cleaned = cleaned.replace(/\s+/g, ' ');
        return cleaned.trim();
    }

    async function speakText(text) {
        if (!voiceEnabled) return;

        stopTTS();

        const lang = detectLang();
        const cleanText = cleanTextForSpeech(text, lang);
        if (!cleanText || cleanText.length < 2) return;

        ttsPlaying = true;

        try {
            const response = await fetch(GAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
                body: JSON.stringify({
                    action: 'tts',
                    text: cleanText,
                    speed: 1.0
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);
            if (!data.audio) throw new Error('No audio data');

            // Convert base64 to audio blob and play
            const audioBytes = atob(data.audio);
            const byteArray = new Uint8Array(audioBytes.length);
            for (let i = 0; i < audioBytes.length; i++) {
                byteArray[i] = audioBytes.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(blob);

            currentAudio = new Audio(audioUrl);
            currentAudio.playbackRate = 1.0;
            currentAudio.onended = () => {
                ttsPlaying = false;
                URL.revokeObjectURL(audioUrl);
                currentAudio = null;
            };
            currentAudio.onerror = () => {
                ttsPlaying = false;
                URL.revokeObjectURL(audioUrl);
                currentAudio = null;
            };

            if (voiceEnabled && ttsPlaying) {
                await currentAudio.play();
            }
        } catch (err) {
            console.warn('OpenAI TTS error:', err);
            ttsPlaying = false;
        }
    }

    function stopTTS() {
        ttsPlaying = false;
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';
            currentAudio = null;
        }
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }

    // ---- Speech Recognition ----
    function toggleMic() {
        if (isListening) { stopListening(); } else { startListening(); }
    }

    function startListening() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            addMessage('status', 'Speech recognition is not supported in this browser');
            return;
        }

        recognition = new SpeechRecognition();
        const langMap = { ru: 'ru-RU', en: 'en-US', lv: 'lv-LV' };
        recognition.lang = langMap[detectLang()] || 'ru-RU';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('vwInput').value = transcript;
            stopListening();
            sendMessage();
        };

        recognition.onerror = () => { stopListening(); };
        recognition.onend = () => { stopListening(); };

        recognition.start();
        isListening = true;
        document.getElementById('vwMic').classList.add('listening');
        addMessage('status', t('listening'));
    }

    function stopListening() {
        if (recognition) { recognition.stop(); recognition = null; }
        isListening = false;
        const mic = document.getElementById('vwMic');
        if (mic) mic.classList.remove('listening');
    }

    // ---- Init ----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
})();
