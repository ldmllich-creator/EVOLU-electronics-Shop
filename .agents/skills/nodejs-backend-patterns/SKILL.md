---
name: nodejs-backend-patterns
description: Best practices for building Node.js + Express backend servers. Covers routing, middleware, error handling, API design, webhooks, and integration with external services like telephony and AI APIs.
---

# Node.js Backend Patterns

Backend development patterns for Node.js + Express applications.

## Project Setup

```bash
npm init -y
npm install express cors dotenv helmet morgan
npm install -D nodemon
```

### package.json scripts:
```json
{
  "scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js"
  }
}
```

## Server Structure

```javascript
// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());          // Security headers
app.use(cors());            // CORS
app.use(morgan('dev'));     // Logging
app.use(express.json());   // JSON parsing

// Routes
app.use('/api/calls', require('./routes/calls'));
app.use('/api/webhooks', require('./routes/webhooks'));
app.use('/api/admin', require('./routes/admin'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Route Pattern

```javascript
// server/routes/calls.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Logic here
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## Service Layer Pattern

```javascript
// server/services/llm.js
const { OpenAI } = require('openai');

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY
});

async function generateResponse(userMessage, context, knowledgeBase) {
  const response = await client.chat.completions.create({
    model: 'anthropic/claude-sonnet-4',
    messages: [
      { role: 'system', content: knowledgeBase },
      ...context,
      { role: 'user', content: userMessage }
    ]
  });
  return response.choices[0].message.content;
}

module.exports = { generateResponse };
```

## Environment Variables (.env)

```env
PORT=3000
OPENROUTER_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
```

## Best Practices

1. **Always use try/catch** in async route handlers
2. **Validate input** before processing
3. **Keep routes thin** — business logic in services
4. **Use environment variables** for all secrets
5. **Add logging** with morgan or custom logger
6. **Use helmet** for security headers
7. **Handle errors** with a global error handler
8. **Structure:** routes → services → data/models
