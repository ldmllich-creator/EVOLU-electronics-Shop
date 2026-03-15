---
name: supabase-best-practices
description: Best practices for working with Supabase as a backend-as-a-service. Covers database design, authentication, real-time subscriptions, edge functions, and security policies.
---

# Supabase Best Practices

Guidelines for building with Supabase effectively.

## Setup

### Project Initialization
1. Create project at [supabase.com](https://supabase.com)
2. Get project URL and anon key from Settings → API
3. Store credentials in `.env` file (never commit!)
4. Install client: `npm install @supabase/supabase-js`

### Client Setup
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
```

## Database Design

### Naming Conventions
- Tables: `snake_case`, plural (`users`, `chat_messages`)
- Columns: `snake_case` (`created_at`, `user_id`)
- Foreign keys: `{referenced_table}_id`

### Essential Columns
Every table should have:
- `id` — UUID, primary key, default `gen_random_uuid()`
- `created_at` — timestamptz, default `now()`
- `updated_at` — timestamptz (optional)

### Common Patterns

#### Users Table
```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);
```

#### Chat Messages
```sql
create table messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  content text not null,
  role text check (role in ('user', 'assistant', 'system')),
  created_at timestamptz default now()
);
```

## Security (RLS)

**Always enable Row Level Security (RLS)!**

```sql
-- Enable RLS
alter table users enable row level security;

-- Users can read their own data
create policy "Users can read own data"
  on users for select
  using (auth.uid() = id);
```

## Real-time
```javascript
const channel = supabase
  .channel('messages')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => console.log('New message:', payload.new)
  )
  .subscribe()
```

## Best Practices
1. Always use RLS policies
2. Use database functions for complex logic
3. Index frequently queried columns
4. Use `select()` to fetch only needed columns
5. Handle errors from every Supabase call
6. Use environment variables for credentials
