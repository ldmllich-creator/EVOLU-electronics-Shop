// ============================================
// EVOLU Bot — Google Apps Script Backend
// Handles: OpenAI chat, Google Sheets logging, Contact form
// ============================================
// 
// DEPLOYMENT INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Create new project (or open existing)
// 3. Replace ALL code with this file's contents
// 4. Click Deploy → New deployment → Web app
// 5. Set "Execute as: Me" and "Who has access: Anyone"
// 6. Authorize and copy the deployment URL
// 7. Paste URL into voice-widget.js (GSHEET_LOG_URL) and script.js (CONTACT_SHEET_URL)
//
// REQUIRED: Set your OpenAI API key and Google Sheet ID below:

var OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // Set your key in Google Apps Script, not here

// Paste your Google Sheet ID here (from the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit)
var SHEET_ID = '1HANWiLEltmQitNPbSoHLtSofRhvbMqpxpLshdYX2f_c';

// --- EVOLU Knowledge Base ---
var SYSTEM_PROMPT_BASE = 'You are Eva, a virtual consultant for EVOLU electronics — a European medical device company based in Latvia.\n' +
  '\n' +
  'KNOWLEDGE BASE:\n' +
  'Products:\n' +
  '- SUPER CAR: compressor inhaler shaped like a racing car, for children, 49 euros 95 cents (was 78 euros 25 cents), minus 36 percent\n' +
  '- NANO AIR PRO: portable mesh nebulizer, ultrasonic, USB charging, silent, 99 euros (was 124 euros 55 cents)\n' +
  '- NANO AIR MINI: ultra-compact mesh nebulizer, 90 grams, rechargeable, 72 euros 87 cents (was 121 euros 45 cents), minus 40 percent\n' +
  '- NANO AIR: portable mesh nebulizer, quiet, one-button, 70 euros 62 cents (was 108 euros 65 cents), minus 35 percent\n' +
  '- UNIVERSAL: compressor nebulizer for whole family, adjustable, 43 euros 44 cents (was 62 euros 5 cents), minus 30 percent\n' +
  '- INTELLIGENT: automatic blood pressure monitor, large display, 2 times 60 measurements memory, arrhythmia indicator, 64 euros 85 cents\n' +
  '- INTELLIGENT BLACK: automatic blood pressure monitor in elegant black design, large display, intelligent inflation, 2 times 60 measurements memory, arrhythmia indicator, 64 euros 85 cents\n' +
  '- AUTOMATIC: compact automatic blood pressure monitor, one-button, 36 euros 45 cents\n' +
  '- NON CONTACT 3-in-1: infrared non-contact thermometer, 1 second, body surface room, 37 euros 95 cents (was 58 euros 45 cents), minus 35 percent\n' +
  '- SOFT: digital thermometer, flexible tip, waterproof, 5 euros 99 cents (was 6 euros 65 cents)\n' +
  '- SIMPLE: basic digital thermometer, 60 seconds, 4 euros 91 cents (was 5 euros 45 cents)\n' +
  '- Pulse Oximeter: fingertip oxygen saturation and pulse, OLED display, 8 seconds, 47 euros 85 cents\n' +
  '\n' +
  'Company info: Website: evolu.lv | Phone: plus 371 20 38 70 70 | Email: info at evolu.lv\n' +
  'CE certified | 2 plus years warranty | Free delivery to parcel lockers in Latvia for orders over 25 euros\n' +
  '\n' +
  'RULES:\n' +
  '1. Be helpful, friendly, concise\n' +
  '2. Never invent products not in the knowledge base\n' +
  '3. If unsure, suggest contacting info at evolu.lv or plus 371 20 38 70 70\n' +
  '4. Do NOT use emojis\n' +
  '5. Keep responses under 150 words\n' +
  '6. ALWAYS write out ALL numbers, prices and percentages as WORDS. Never use symbols like the euro sign, percent sign, or plus sign\n' +
  '7. When users ask technical questions about a product, mention that a detailed instruction manual PDF is available';

var LANG_INSTRUCTIONS = {
  'ru': '\n8. RESPOND ONLY IN RUSSIAN.\n9. ALWAYS write out ALL numbers as WORDS in Russian. Example: "сорок девять евро девяносто пять центов" not "49,95". "минус тридцать шесть процентов" not "-36%".',
  'en': '\n8. RESPOND ONLY IN ENGLISH.\n9. ALWAYS write out ALL numbers as WORDS in English. Example: "forty-nine euros and ninety-five cents" not "49.95". "minus thirty-six percent" not "-36%".',
  'lv': '\n8. RESPOND ONLY IN LATVIAN (latviesu valoda).\n9. ALWAYS write out ALL numbers as WORDS in Latvian. Example: "cetrdesmit devini eiro un devinsdesmit pieci centi" not "49,95".'
};

// --- Handle POST requests ---
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.action === 'chat') {
      return handleChat(data);
    } else if (data.action === 'tts') {
      return handleTTS(data);
    } else if (data.action === 'chat_log') {
      logToSheet('ChatLogs', data);
      return jsonResponse({ status: 'logged' });
    } else if (data.action === 'contact') {
      logToSheet('Contacts', data);
      return jsonResponse({ status: 'saved' });
    }

    return jsonResponse({ error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// --- Text-to-Speech via OpenAI ---
function handleTTS(data) {
  var text = (data.text || '').trim();
  if (!text) return jsonResponse({ error: 'No text provided' });

  var response = UrlFetchApp.fetch('https://api.openai.com/v1/audio/speech', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + OPENAI_API_KEY
    },
    payload: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: 'nova',
      speed: data.speed || 1.0,
      response_format: 'mp3'
    }),
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    return jsonResponse({ error: 'TTS API error: ' + response.getContentText() });
  }

  var audioBlob = response.getBlob();
  var base64Audio = Utilities.base64Encode(audioBlob.getBytes());

  return jsonResponse({ audio: base64Audio });
}

// --- Handle GET requests (for CORS preflight fallback) ---
function doGet(e) {
  return jsonResponse({ status: 'EVOLU Bot API is running' });
}

// --- Chat with OpenAI ---
function handleChat(data) {
  var lang = data.lang || 'ru';
  // Use client-provided system prompt if available, otherwise fall back to server-side prompt
  var systemPrompt = data.systemPrompt || (SYSTEM_PROMPT_BASE + (LANG_INSTRUCTIONS[lang] || LANG_INSTRUCTIONS['ru']));

  var messages = [
    { role: 'system', content: systemPrompt }
  ];

  // Add chat history
  var history = (data.history || []).slice(-10);
  for (var i = 0; i < history.length; i++) {
    messages.push(history[i]);
  }

  // Add current user message
  messages.push({ role: 'user', content: data.message });

  var response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + OPENAI_API_KEY
    },
    payload: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    }),
    muteHttpExceptions: true
  });

  var result = JSON.parse(response.getContentText());

  if (result.error) {
    return jsonResponse({ error: result.error.message });
  }

  var reply = result.choices[0].message.content.trim();

  // Log to Google Sheet
  logToSheet('ChatLogs', {
    sessionId: data.sessionId,
    lang: lang,
    userMessage: data.message,
    botReply: reply,
    timestamp: new Date().toISOString()
  });

  return jsonResponse({ reply: reply });
}

// --- Log data to Google Sheet ---
function logToSheet(sheetName, data) {
  try {
    if (!SHEET_ID) return; // Skip if no sheet ID configured

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      // Add headers
      if (sheetName === 'ChatLogs') {
        sheet.appendRow(['Timestamp', 'Session ID', 'Language', 'User Message', 'Bot Reply', 'Source']);
      } else if (sheetName === 'Contacts') {
        sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message', 'Language', 'Source']);
      }
    }

    if (sheetName === 'ChatLogs') {
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.sessionId || '',
        data.lang || '',
        data.userMessage || '',
        data.botReply || '',
        data.source || 'voice_widget'
      ]);
    } else if (sheetName === 'Contacts') {
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.message || '',
        data.lang || '',
        data.source || 'landing_contact_form'
      ]);
    }
  } catch (err) {
    Logger.log('Sheet logging error: ' + err);
  }
}

// --- JSON Response helper ---
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
