---
name: workflow-automation
description: Helps create automated workflows, process automation, and integration between different services and tools. Useful for building bots, automating repetitive tasks, and connecting APIs.
---

# Workflow Automation

This skill specializes in creating automated workflows and process automation.

## Core Capabilities

### Bot Development
- Telegram bots with AI integration
- Voice bots and conversational agents  
- Customer service automation
- Multi-channel message routing

### Process Automation
- Data pipeline automation
- Schedule-based task execution
- Event-driven workflows
- Document processing and generation

### Integration Patterns
- API-to-API connections
- Webhook handlers
- Database synchronization
- Third-party service integration (CRM, email, messaging)

## Best Practices

1. **Start simple** — automate one process at a time
2. **Error handling** — always include fallback behavior
3. **Logging** — track all automated actions for debugging
4. **Rate limiting** — respect API limits of integrated services
5. **Security** — store API keys in environment variables, never in code
6. **Testing** — test each automation step independently before connecting

## Architecture Pattern

```
Trigger (event/schedule/webhook)
  → Input validation
  → Processing logic (AI/rules)
  → Action (send message/update DB/call API)
  → Logging & error handling
  → Response/confirmation
```

## Common Integrations

| Service | Use Case | Protocol |
|---------|----------|----------|
| Telegram | Bot messaging | Bot API |
| OpenRouter | AI model access | REST API |
| Supabase | Database | MCP/REST |
| Whisper | Audio transcription | API |
| GitHub | Code storage | Git/API |

## Prompts for Development

### Create a Bot:
```
Create a [type] bot that:
1. [Main function]
2. [Secondary function]
3. Uses [AI model] for intelligence
4. Stores data in [database]
5. Handles errors gracefully
```

### Automate a Process:
```
Automate the following process:
1. Trigger: [what starts it]
2. Input: [what data is needed]
3. Processing: [what to do with data]
4. Output: [what result to produce]
5. Schedule: [how often to run]
```
