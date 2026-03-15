---
name: voice-ai-bot
description: Specialized skill for building voice AI bots with telephony integration. Covers Speech-to-Text, Text-to-Speech, LLM conversation management, call handling, knowledge base integration, and operator handoff logic.
---

# Voice AI Bot Development

Complete guide for building voice AI bots with telephony, STT, TTS, and LLM integration.

## Architecture

```
Incoming Call → Telephony Provider (Twilio/Voximplant)
  → Webhook → Server receives audio stream
    → STT (Whisper/Google) → text
      → LLM (Claude via OpenRouter) → response text
        → TTS (ElevenLabs/Google) → audio
          → Stream back to caller
  
  Parallel: Log everything → Supabase → Admin Panel
```

## Telephony Integration (Twilio)

### Setup
```bash
npm install twilio
```

### Incoming Call Webhook
```javascript
const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

app.post('/api/webhooks/incoming-call', (req, res) => {
  const twiml = new VoiceResponse();
  
  // Greeting
  twiml.say({
    voice: 'alice',
    language: 'ru-RU'
  }, 'Здравствуйте! Чем могу помочь?');
  
  // Gather speech input
  twiml.gather({
    input: 'speech',
    language: 'ru-RU',
    timeout: 5,
    action: '/api/webhooks/process-speech'
  });
  
  res.type('text/xml');
  res.send(twiml.toString());
});
```

## Speech-to-Text (STT)

### Options:
| Provider | Quality | Speed | Cost |
|----------|---------|-------|------|
| Whisper API | Excellent | Medium | $ |
| Google STT | Good | Fast | $$ |
| Yandex SpeechKit | Good (Russian) | Fast | $ |

### Whisper Integration
```javascript
const { OpenAI } = require('openai');

async function transcribeAudio(audioBuffer) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const transcription = await openai.audio.transcriptions.create({
    file: audioBuffer,
    model: 'whisper-1',
    language: 'ru'
  });
  return transcription.text;
}
```

## Text-to-Speech (TTS)

### Options:
| Provider | Voice Quality | Russian | Cost |
|----------|--------------|---------|------|
| ElevenLabs | Best (natural) | Yes | $$$ |
| Google TTS | Good | Yes | $ |
| Yandex SpeechKit | Good | Best | $ |

### ElevenLabs Integration
```javascript
async function synthesizeSpeech(text) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2'
      })
    }
  );
  return await response.arrayBuffer();
}
```

## LLM Conversation Management

### System Prompt for Voice Bot:
```
Ты — голосовой AI-консультант интернет-магазина [Название].
Твоя задача — помочь клиенту по телефону.

Правила:
1. Отвечай кратко и по-человечески (это телефонный разговор)
2. Не используйте маркдаун, списки или форматирование — только простую речь
3. Максимальная длина ответа — 2-3 предложения
4. Если не знаешь ответа — честно скажи и предложи переключить на оператора
5. Классифицируй обращение: консультация / жалоба / возврат / гарантия

База знаний товаров:
[KNOWLEDGE_BASE]
```

### Conversation Context Management
```javascript
// Store conversation context per call
const conversations = new Map();

function getOrCreateConversation(callSid) {
  if (!conversations.has(callSid)) {
    conversations.set(callSid, {
      messages: [],
      startedAt: new Date(),
      topic: null,
      escalated: false
    });
  }
  return conversations.get(callSid);
}
```

### Operator Handoff Logic
```javascript
function shouldEscalate(conversation, latestResponse) {
  // Escalate if:
  // 1. Customer explicitly asks for operator
  if (/оператор|человек|менеджер|переключ/i.test(latestResponse)) return true;
  // 2. 3+ failed attempts
  if (conversation.failedAttempts >= 3) return true;
  // 3. Aggressive language detected
  if (/жалоб|суд|прокур|роспотреб/i.test(latestResponse)) return true;
  // 4. Out of knowledge base
  if (conversation.outOfScope) return true;
  
  return false;
}
```

## Knowledge Base Integration

### JSON Structure:
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Description",
      "price": 1990,
      "in_stock": true,
      "specs": { "weight": "200g", "color": "black" },
      "troubleshooting": [
        { "problem": "Не включается", "solution": "Проверьте зарядку" }
      ]
    }
  ],
  "faq": [
    { "question": "Как оформить возврат?", "answer": "..." }
  ]
}
```

## Call Logging (Supabase)

```sql
CREATE TABLE calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_sid TEXT UNIQUE,
  phone_number TEXT,
  topic TEXT,
  status TEXT DEFAULT 'active',
  transcript TEXT,
  escalated BOOLEAN DEFAULT FALSE,
  duration_seconds INT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## Best Practices for Voice Bots

1. **Keep responses SHORT** — 2-3 sentences max for natural conversation
2. **Add pauses** — use SSML or comma pauses for natural rhythm
3. **Handle silence** — if user is silent, prompt them
4. **Confirmation** — repeat key info back: "Вы сказали, что хотите..."
5. **Graceful failures** — always have a fallback: "Извините, не расслышал"
6. **Response time** — under 3 seconds total (STT + LLM + TTS)
7. **Test with real calls** — automated tests aren't enough for voice
