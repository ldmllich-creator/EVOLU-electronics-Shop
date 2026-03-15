---
name: admin-panel-frontend
description: Best practices for building admin panel frontends with HTML, CSS, JavaScript, and React. Covers dashboard design, tables, charts, real-time data, and call log interfaces.
---

# Admin Panel Frontend

Guidelines for building admin dashboards for data monitoring and management.

## Dashboard Layout

```
┌─────────────────────────────────────────────┐
│  🏠 Logo    Dashboard    Calls    Settings  │  ← Header/Nav
├──────────┬──────────────────────────────────┤
│          │  ┌──────┐ ┌──────┐ ┌──────┐     │
│  Sidebar │  │ KPI 1│ │ KPI 2│ │ KPI 3│     │  ← Stat Cards
│  - Home  │  └──────┘ └──────┘ └──────┘     │
│  - Calls │  ┌──────────────────────────┐    │
│  - Stats │  │                          │    │
│  - KB    │  │      Chart / Graph       │    │  ← Visualizations
│  - Users │  │                          │    │
│          │  └──────────────────────────┘    │
│          │  ┌──────────────────────────┐    │
│          │  │  Call Log Table          │    │  ← Data Tables
│          │  │  Date | Phone | Topic.. │    │
│          │  └──────────────────────────┘    │
└──────────┴──────────────────────────────────┘
```

## Key Components

### Stat Cards
```html
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-number" id="total-calls">0</div>
    <div class="stat-label">Всего звонков</div>
  </div>
  <div class="stat-card">
    <div class="stat-number" id="resolved">0</div>
    <div class="stat-label">Решено ботом</div>
  </div>
  <div class="stat-card">
    <div class="stat-number" id="escalated">0</div>
    <div class="stat-label">Переведено на оператора</div>
  </div>
</div>
```

### Call Log Table
```html
<table class="calls-table">
  <thead>
    <tr>
      <th>Дата</th>
      <th>Телефон</th>
      <th>Тема</th>
      <th>Статус</th>
      <th>Длительность</th>
      <th>Действия</th>
    </tr>
  </thead>
  <tbody id="calls-body">
    <!-- Rows populated via JS -->
  </tbody>
</table>
```

### Call Detail Modal
```html
<div class="modal" id="call-modal">
  <div class="modal-content">
    <h2>Детали звонка</h2>
    <div class="transcript" id="call-transcript">
      <!-- Transcript displayed here -->
    </div>
    <audio controls id="call-recording"></audio>
  </div>
</div>
```

## Data Fetching

```javascript
// Fetch calls from API
async function loadCalls(page = 1) {
  const response = await fetch(`/api/admin/calls?page=${page}&limit=20`, {
    headers: { 'x-api-key': API_KEY }
  });
  const data = await response.json();
  renderCallsTable(data.data);
  updateStats(data.meta);
}

// Real-time updates via polling
setInterval(loadCalls, 30000); // 30 sec
```

## Styling Guidelines

```css
:root {
  --bg-dark: #0f172a;
  --bg-card: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent: #3b82f6;
  --success: #22c55e;
  --warning: #eab308;
  --danger: #ef4444;
}

/* Dark admin theme */
body {
  background: var(--bg-dark);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
}

.stat-card {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.1);
}

.calls-table {
  width: 100%;
  border-collapse: collapse;
}

.calls-table td {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

/* Status badges */
.status-resolved { color: var(--success); }
.status-escalated { color: var(--warning); }
.status-active { color: var(--accent); }
```

## Checklist
- [ ] Dashboard with KPI cards
- [ ] Call log with search and filters
- [ ] Call detail view with transcript
- [ ] Statistics/charts
- [ ] Knowledge base management
- [ ] Responsive on tablet
- [ ] Dark theme
- [ ] Loading states
