// ===== DATA: All steps of the trainer =====
const steps = [
    {
        id: 'step0',
        num: '0',
        emoji: '🔬',
        title: 'Исследование',
        description: 'Прежде чем начать, пойми рынок. Попроси ИИ помочь с анализом конкурентов и поиском незакрытых потребностей.',
        prompt: `Я хочу создать [тип продукта] для [целевая аудитория].
Проведи анализ:
1. Какие аналоги уже существуют?
2. Какие проблемы пользователей они не решают?
3. В чём может быть моё конкурентное преимущество?
4. Какой минимальный функционал нужен для MVP?

Не пиши код, только аналитику.`,
        checklist: [
            'Определены конкуренты',
            'Найдены незакрытые потребности',
            'Сформулировано УТП (уникальное торговое предложение)'
        ]
    },
    {
        id: 'step1',
        num: '1',
        emoji: '💡',
        title: 'Идея',
        description: 'Опиши свою идею: какую проблему решает продукт, для кого он, как будет зарабатывать.',
        template: `# Идея проекта

## Название: [Название продукта]

## Проблема:
[Какую проблему решает? Кому больно без этого продукта?]

## Решение:
[Что именно делает продукт? В 2-3 предложениях]

## Целевая аудитория:
[Кто будет пользоваться? Возраст, профессия, страна]

## Монетизация:
[Как будет зарабатывать? Подписка / разовая / freemium]

## Примеры использования:
1. [Пользователь заходит и...]
2. [Потом он...]
3. [В результате получает...]`,
        prompt: `Вот моя идея проекта: [вставь заполненный шаблон]

Доработай её:
1. Уточни формулировки
2. Предложи дополнительные фичи
3. Оцени сложность реализации (1-10)

Не пиши код, только документацию.`,
        checklist: [
            'Проблема описана чётко',
            'Решение конкретное (не абстрактное)',
            'Понятно, кто пользователь',
            'Есть хотя бы 1 путь монетизации'
        ]
    },
    {
        id: 'step2',
        num: '2',
        emoji: '📐',
        title: 'Техническое задание',
        description: 'ТЗ — скелет проекта. Здесь перечислены все функции, платформы и интеграции.',
        template: `# Техническое задание

## 1. Общее описание
[Краткое описание проекта и его целей]

## 2. Функциональные требования
### Обязательные (MVP):
- [ ] [Функция 1 — что делает]
- [ ] [Функция 2 — что делает]
- [ ] [Функция 3 — что делает]

### Желательные (v2):
- [ ] [Функция 4]
- [ ] [Функция 5]

## 3. Нефункциональные требования
- Язык интерфейса: [русский / английский]
- Платформы: [веб / мобайл / десктоп]
- Время загрузки: [< 3 сек]

## 4. Интеграции
- [ ] [С какими сервисами? API, базы, CRM]

## 5. Ограничения
- [Бюджет / сроки / технические ограничения]`,
        prompt: `Вот моя идея: [перетащи файл идеи]

На основе этой идеи создай подробное техническое задание.
Включи: функциональные требования, нефункциональные требования,
список интеграций, и ограничения.

Не пиши код, только ТЗ.`,
        checklist: [
            'Все функции перечислены',
            'Разделены MVP и «потом»',
            'Указаны платформы и язык',
            'Указаны интеграции (если есть)'
        ]
    },
    {
        id: 'step3',
        num: '3',
        emoji: '🏗️',
        title: 'Архитектура проекта',
        description: 'Архитектура — это порядок в файлах. Как будут расположены папки и файлы вашего проекта.',
        template: `# Архитектура проекта

## Структура файлов:
📁 Проект/
├── 📄 1_Идея.md
├── 📄 2_ТЗ.md
├── 📄 3_Архитектура.md
├── 📄 4_Дизайн.md
├── 📄 5_Задачи.md
├── 📁 src/
│   ├── 📁 components/
│   ├── 📁 pages/
│   └── 📄 index.html
├── 📁 assets/
└── 📄 README.md

## Технологии:
- Фронтенд: [HTML + CSS + JS / React]
- Бэкенд: [Node.js / Python / нет]
- База данных: [Supabase / Firebase / нет]
- ИИ-модель: [Claude / GPT]
- Хостинг: [Vercel / Netlify / свой сервер]`,
        prompt: `Вот моё ТЗ: [перетащи файл ТЗ]

Создай архитектуру проекта:
1. Структура файлов и папок
2. Какие технологии использовать
3. Как компоненты связаны между собой

Не пиши код! Только структуру и описание.`,
        checklist: [
            'Есть дерево файлов',
            'Выбраны технологии',
            'Понятно, где что лежит'
        ]
    },
    {
        id: 'step4',
        num: '4',
        emoji: '🎨',
        title: 'Требования к дизайну',
        description: 'Как будет выглядеть ваш продукт: цвета, шрифты, страницы, элементы интерфейса.',
        template: `# Требования к дизайну

## Стиль:
- Тема: [светлая / тёмная / обе]
- Стиль: [минималистичный / яркий / премиальный]

## Цвета:
- Основной: [#hex]
- Акцентный: [#hex]
- Фон: [#hex]

## Шрифты:
- Заголовки: [название]
- Текст: [название]

## Страницы:
1. Главная — [что на ней]
2. Страница 2 — [описание]

## Адаптивность:
- Мобильная версия: [да / нет]`,
        prompt: `Вот архитектура проекта: [перетащи файл архитектуры]

Создай требования к дизайну:
- Цветовая палитра
- Шрифты
- Описание каждой страницы
- Стиль UI-элементов

Сделай дизайн современным и премиальным.
Не пиши код, только требования к дизайну.`,
        checklist: [
            'Выбрана цветовая палитра',
            'Выбраны шрифты',
            'Описаны все страницы',
            'Указан стиль элементов'
        ]
    },
    {
        id: 'step5',
        num: '5',
        emoji: '✅',
        title: 'Список задач',
        description: 'Разбейте разработку на конкретные задачи с чеклистами для отслеживания прогресса.',
        prompt: `Вот все мои документы: [перетащи Идею, ТЗ, Архитектуру, Дизайн]

Создай список задач для разработки.
Раздели на этапы, каждую задачу сделай конкретной.
Добавь чеклисты для отслеживания прогресса.

Не пиши код, только список задач.`,
        checklist: [
            'Задачи разбиты на этапы',
            'Каждая задача — конкретное действие',
            'Есть чеклисты для отслеживания'
        ]
    },
    {
        id: 'step51',
        num: '5.1',
        emoji: '🚀',
        title: 'Запуск локально',
        description: 'Теперь можно разрешить ИИ писать код! Запускаем проект на своём компьютере.',
        warning: 'С этого момента ИИ будет писать код. До этого — только документация!',
        prompt: `Вот мой проект: [перетащи ВСЕ файлы документации]

Теперь можно писать код.
Начни с первого этапа задач.
После каждой задачи отмечай её как выполненную [x] в файле задач.
Запусти проект локально, чтобы я мог(ла) его увидеть.`,
        checklist: [
            'ИИ начал писать код',
            'Проект запускается локально',
            'Можно открыть в браузере / протестировать'
        ]
    },
    {
        id: 'step6',
        num: '6',
        emoji: '🧪',
        title: 'Тестирование',
        description: 'Проверяем все функции, ищем баги, тестируем на разных устройствах.',
        prompt: `Протестируй проект:
1. Проверь все функции из ТЗ — работают ли?
2. Попробуй разные сценарии использования
3. Проверь на разных размерах экрана
4. Запиши все найденные баги

Результаты тестирования запиши в файл 6_Тестирование.md`,
        checklist: [
            'Все функции из ТЗ работают',
            'Проверены разные сценарии',
            'Адаптивность на мобильных',
            'Найденные баги записаны'
        ]
    },
    {
        id: 'step7',
        num: '7',
        emoji: '🌐',
        title: 'Деплой',
        description: 'Размещаем проект на сервере, чтобы он был доступен по ссылке 24/7.',
        prompt: `Размести проект на сервере.
Предложи варианты хостинга для моего типа проекта.
Пошагово опиши процесс деплоя.`,
        checklist: [
            'Выбран хостинг',
            'Проект размещён на сервере',
            'Ссылка работает и открывается',
            'Настроен домен (если нужен)'
        ]
    },
    {
        id: 'step8',
        num: '8',
        emoji: '🐛',
        title: 'Дебаггинг',
        description: 'Исправляем все найденные ошибки и баги.',
        prompt: `Вот список багов из тестирования: [перетащи файл тестирования]

Исправь каждый баг.
После исправления пометь как [x] в файле тестирования.
Объясни, что было не так и как ты это исправил(а).`,
        checklist: [
            'Все баги из тестирования исправлены',
            'Повторное тестирование пройдено',
            'Нет критических ошибок'
        ]
    },
    {
        id: 'step9',
        num: '9',
        emoji: '🎉',
        title: 'Продакшн / Релиз',
        description: 'Финальная проверка, оптимизация и запуск продукта!',
        prompt: `Проект готов к релизу.
1. Проверь, что всё работает на сервере
2. Оптимизируй производительность
3. Создай README.md с описанием проекта
4. Подготовь инструкцию для пользователей`,
        checklist: [
            'Продукт работает стабильно на сервере',
            'Производительность оптимизирована',
            'README.md создан',
            'Инструкция для пользователей готова',
            '🚀 Продукт запущен!'
        ],
        tip: 'Если застрял(а) — перетащи все файлы проекта в Antigravity и напиши:\n«Я прохожу курс вайбкодинга. Вот мои файлы. Подскажи, что делать дальше и что можно улучшить»'
    }
];

// ===== STATE =====
let currentStep = 0;
let checklistState = {};

function loadState() {
    try {
        const saved = localStorage.getItem('trainer_state');
        if (saved) {
            const data = JSON.parse(saved);
            currentStep = data.currentStep || 0;
            checklistState = data.checklistState || {};
        }
    } catch (e) { }
}

function saveState() {
    localStorage.setItem('trainer_state', JSON.stringify({ currentStep, checklistState }));
}

// ===== RENDER NAV =====
function renderNav() {
    const nav = document.getElementById('navSteps');
    nav.innerHTML = steps.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = isStepCompleted(i);
        const cls = [
            'nav-item',
            isActive ? 'active' : '',
            isCompleted ? 'completed' : ''
        ].filter(Boolean).join(' ');
        return `
      <div class="${cls}" onclick="goToStep(${i})">
        <div class="step-num">${isCompleted ? '✓' : step.num}</div>
        <span>${step.title}</span>
      </div>`;
    }).join('');
}

// ===== CHECK IF STEP COMPLETED =====
function isStepCompleted(stepIndex) {
    const step = steps[stepIndex];
    if (!step.checklist) return false;
    const state = checklistState[step.id] || {};
    return step.checklist.every((_, ci) => state[ci] === true);
}

// ===== PROGRESS =====
function updateProgress() {
    let total = 0, done = 0;
    steps.forEach((step, i) => {
        if (step.checklist) {
            total += step.checklist.length;
            const state = checklistState[step.id] || {};
            step.checklist.forEach((_, ci) => { if (state[ci]) done++; });
        }
    });
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const ring = document.getElementById('progressRing');
    const text = document.getElementById('progressText');
    const circumference = 2 * Math.PI * 42;
    ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    text.textContent = pct + '%';

    if (pct === 100) {
        ring.style.stroke = '#22c55e';
        text.style.color = '#22c55e';
    } else {
        ring.style.stroke = '#6366f1';
        text.style.color = '#818cf8';
    }
}

// ===== RENDER CONTENT =====
function renderContent() {
    const step = steps[currentStep];
    const content = document.getElementById('content');
    let html = `<div class="step-card">`;

    html += `<div class="step-badge">Шаг ${step.num}</div>`;
    html += `<h1>${step.emoji} ${step.title}</h1>`;
    html += `<p class="description">${step.description}</p>`;

    if (step.warning) {
        html += `<div class="warning">⚠️ ${step.warning}</div>`;
    }

    // Template
    if (step.template) {
        html += `
      <div class="section">
        <h3>📋 Шаблон для заполнения</h3>
        <div class="template" id="template-${step.id}">
          <button class="btn-copy" onclick="copyText('template-${step.id}', this)">📋 Копировать</button>
          ${escapeHtml(step.template)}
        </div>
      </div>`;
    }

    // Prompt
    if (step.prompt) {
        html += `
      <div class="section">
        <h3>💬 Промт для Antigravity</h3>
        <div class="prompt-box" id="prompt-${step.id}">
          <button class="btn-copy" onclick="copyText('prompt-${step.id}', this)">📋 Копировать</button>
          ${escapeHtml(step.prompt)}
        </div>
      </div>`;
    }

    // Checklist
    if (step.checklist) {
        const state = checklistState[step.id] || {};
        html += `
      <div class="section">
        <h3>☑️ Чеклист</h3>
        <ul class="checklist">
          ${step.checklist.map((item, ci) => {
            const checked = state[ci] ? 'checked' : '';
            return `<li class="${checked}" onclick="toggleCheck('${step.id}', ${ci})">
              <div class="check-box">${state[ci] ? '✓' : ''}</div>
              <span>${item}</span>
            </li>`;
        }).join('')}
        </ul>
      </div>`;
    }

    // Tip
    if (step.tip) {
        html += `<div class="tip">💡 <strong>Совет от Георгия:</strong> ${step.tip}</div>`;
    }

    // Navigation
    html += `<div class="step-nav">`;
    html += currentStep > 0
        ? `<button class="btn-nav" onclick="goToStep(${currentStep - 1})">← Назад</button>`
        : `<button class="btn-nav" disabled>← Назад</button>`;
    html += currentStep < steps.length - 1
        ? `<button class="btn-nav primary" onclick="goToStep(${currentStep + 1})">Далее →</button>`
        : `<button class="btn-nav primary" disabled>🏆 Готово!</button>`;
    html += `</div>`;

    html += `</div>`;
    content.innerHTML = html;
}

// ===== ACTIONS =====
function goToStep(i) {
    currentStep = i;
    saveState();
    renderNav();
    renderContent();
    updateProgress();
    document.getElementById('main').scrollTop = 0;
    window.scrollTo(0, 0);
    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

function toggleCheck(stepId, checkIndex) {
    if (!checklistState[stepId]) checklistState[stepId] = {};
    checklistState[stepId][checkIndex] = !checklistState[stepId][checkIndex];
    saveState();
    renderNav();
    renderContent();
    updateProgress();
}

function copyText(elementId, btn) {
    const el = document.getElementById(elementId);
    // Get text without the copy button
    const text = el.innerText.replace('📋 Копировать', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        btn.textContent = '✅ Скопировано!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '📋 Копировать';
            btn.classList.remove('copied');
        }, 2000);
    });
}

function resetProgress() {
    if (confirm('Сбросить весь прогресс? Все чеклисты обнулятся.')) {
        checklistState = {};
        currentStep = 0;
        saveState();
        renderNav();
        renderContent();
        updateProgress();
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ===== INIT =====
loadState();
renderNav();
renderContent();
updateProgress();
