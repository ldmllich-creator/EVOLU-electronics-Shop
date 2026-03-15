---
name: systematic-debugging
description: A systematic approach to debugging code issues. Provides structured methodology for identifying, isolating, and fixing bugs in any codebase.
---

# Systematic Debugging

A structured approach to finding and fixing bugs.

## Debugging Process

### Step 1: Reproduce
- Confirm the bug exists
- Document exact steps to reproduce
- Note expected vs actual behavior
- Check if it's consistent or intermittent

### Step 2: Isolate
- Narrow down the affected area
- Check recent changes (git diff)
- Use binary search on commits if needed
- Comment out sections to isolate

### Step 3: Diagnose
- Read error messages carefully
- Check logs (terminal, browser console)
- Add console.log/print statements
- Check variable values at key points
- Verify data types and formats

### Step 4: Fix
- Make the minimal change needed
- Don't fix symptoms — fix root cause
- Test the fix with the reproduction steps
- Check for side effects

### Step 5: Verify
- Run all tests
- Check related functionality
- Test edge cases
- Document what was wrong and how it was fixed

## Common Bug Categories

| Category | Symptoms | First Check |
|----------|----------|-------------|
| **Syntax** | Won't run at all | Error message line number |
| **Runtime** | Crashes during use | Console errors |
| **Logic** | Wrong output | Variable values |
| **Network** | No data / timeout | API responses, CORS |
| **File paths** | File not found | Cyrillic in paths (Windows!) |
| **Encoding** | Garbled text | UTF-8 settings |
| **Dependencies** | Module not found | package.json, npm install |

## Quick Fixes

### "Module not found"
```bash
npm install
# or
npm install <missing-module>
```

### "Port already in use"
```bash
# Find and kill the process
npx kill-port 3000
```

### "CORS error"
Add CORS headers to your server or use a proxy.

### Cyrillic file path issues (Windows)
Rename all files and folders to Latin characters with underscores.

## Debugging Prompt
```
I have a bug:
- Expected behavior: [what should happen]
- Actual behavior: [what actually happens]
- Steps to reproduce: [exact steps]
- Error messages: [copy paste errors]

Please help me debug this systematically.
```
