---
name: security-best-practices
description: Security best practices for web applications and APIs. Covers API key management, environment variables, data protection, input validation, CORS, and telephony security.
---

# Security Best Practices

Essential security measures for web applications and APIs.

## Environment Variables

### .env file (NEVER commit this!)
```env
# Server
PORT=3000
NODE_ENV=production

# API Keys
OPENROUTER_API_KEY=sk-or-...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
ELEVENLABS_API_KEY=...
SUPABASE_URL=https://...
SUPABASE_KEY=eyJ...

# Admin
ADMIN_API_KEY=your-secure-key
```

### .gitignore (ALWAYS include!)
```
.env
.env.local
node_modules/
*.log
```

## Input Validation

```javascript
// Sanitize user input
const sanitizeHtml = require('sanitize-html');

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return sanitizeHtml(input, { allowedTags: [] });
}
```

## CORS Configuration

```javascript
const cors = require('cors');

// Restrictive CORS for production
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key']
}));
```

## Webhook Verification (Twilio)

```javascript
const twilio = require('twilio');

function validateTwilioWebhook(req, res, next) {
  const signature = req.headers['x-twilio-signature'];
  const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  
  const isValid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN,
    signature,
    url,
    req.body
  );
  
  if (!isValid) {
    return res.status(403).json({ error: 'Invalid webhook signature' });
  }
  next();
}
```

## Data Protection

### Personal Data Rules:
1. **Minimize** — collect only what you need
2. **Encrypt** — use HTTPS everywhere
3. **Retain** — delete data when no longer needed
4. **Access** — restrict who can view personal data
5. **Mask** — hide phone numbers in logs: `+7***1234`

### Phone Number Masking:
```javascript
function maskPhone(phone) {
  if (!phone || phone.length < 4) return '***';
  return phone.slice(0, 2) + '***' + phone.slice(-4);
}
```

## Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: { error: 'Too many requests' }
});

app.use('/api/', apiLimiter);
```

## Security Checklist

- [ ] All API keys in .env file
- [ ] .env added to .gitignore
- [ ] Helmet middleware enabled
- [ ] CORS configured (not *)
- [ ] Input validation on all endpoints
- [ ] Webhook signatures verified
- [ ] Rate limiting enabled
- [ ] HTTPS in production
- [ ] Personal data masked in logs
- [ ] Admin panel password-protected
