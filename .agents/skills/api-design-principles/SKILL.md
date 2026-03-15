---
name: api-design-principles
description: REST API design principles for building clean, consistent, and well-documented APIs. Covers routing conventions, status codes, error handling, authentication, pagination, and webhook design.
---

# API Design Principles

Standards for building clean REST APIs.

## URL Structure

```
GET    /api/calls          → List all calls
GET    /api/calls/:id      → Get specific call
POST   /api/calls          → Create new call record
PUT    /api/calls/:id      → Update call record
DELETE /api/calls/:id      → Delete call record

POST   /api/webhooks/incoming    → Receive incoming call webhook
POST   /api/webhooks/status      → Receive call status update
```

### Rules:
- Use **nouns**, not verbs (`/api/calls` not `/api/getCalls`)
- Use **plural** names (`/api/products` not `/api/product`)
- Use **kebab-case** for multi-word (`/api/call-logs`)
- Nest related resources (`/api/calls/:id/transcript`)

## HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET/PUT |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid auth |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected error |

## Response Format

### Success:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 50,
    "limit": 10
  }
}
```

### Error:
```json
{
  "success": false,
  "error": {
    "code": "CALL_NOT_FOUND",
    "message": "Call with ID abc123 not found"
  }
}
```

## Pagination

```
GET /api/calls?page=1&limit=10&sort=created_at&order=desc
```

## Webhook Design

```javascript
// Receiving webhooks
app.post('/api/webhooks/incoming', (req, res) => {
  // 1. Verify webhook signature
  // 2. Process the event
  // 3. Return 200 ASAP (process async if needed)
  
  const event = req.body;
  
  // Acknowledge immediately
  res.status(200).json({ received: true });
  
  // Process asynchronously
  processEvent(event).catch(console.error);
});
```

## Authentication

```javascript
// Simple API key middleware
function authenticateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Protected routes
app.use('/api/admin', authenticateApiKey);
```

## Input Validation

```javascript
function validateCallData(req, res, next) {
  const { phone_number, topic } = req.body;
  
  if (!phone_number) {
    return res.status(400).json({ error: 'phone_number is required' });
  }
  
  next();
}
```
