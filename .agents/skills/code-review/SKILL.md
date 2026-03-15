---
name: code-review
description: Performs thorough code review analyzing code quality, security, performance, and adherence to best practices. Identifies issues and suggests improvements.
---

# Code Review

Systematic code review skill for quality assurance.

## Review Checklist

### 1. Correctness
- Does the code do what it's supposed to?
- Are edge cases handled?
- Is error handling adequate?

### 2. Security
- Are API keys in environment variables?
- Is user input validated/sanitized?
- Are SQL queries parameterized?
- Is authentication/authorization proper?

### 3. Performance
- Are there unnecessary loops or API calls?
- Is data being fetched efficiently?
- Are large files/images optimized?
- Are expensive operations cached?

### 4. Readability
- Are variable/function names descriptive?
- Is the code well-organized?
- Are there comments for complex logic?
- Is formatting consistent?

### 5. Architecture
- Does it follow the project's patterns?
- Are concerns properly separated?
- Are components reusable?

## Review Prompt
```
Review this code for:
1. Bugs and potential issues
2. Security vulnerabilities
3. Performance problems
4. Code quality and readability
5. Best practices adherence

Provide specific suggestions with code examples.
```

## Severity Levels
| Level | Description | Action |
|-------|-------------|--------|
| 🔴 Critical | Security hole, data loss | Must fix immediately |
| 🟠 Major | Bug, poor UX | Fix before release |
| 🟡 Minor | Code smell, low impact | Fix when convenient |
| 🟢 Suggestion | Improvement idea | Consider for future |
