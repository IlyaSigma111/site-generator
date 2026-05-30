// ===== Template data =====
const TEMPLATES = [
  {id:1,name:"Лендинг",desc:"Продающий одностраничник.",complex:"easy",n:"5-6 блоков", blocks:["Hero с CTA","О продукте","Преимущества","Отзывы","Форма захвата","Футер"]},
  {id:2,name:"Сайт-визитка",desc:"Представление компании или человека.",complex:"easy",n:"5-6 блоков", blocks:["Лого + меню","О себе","Услуги","Портфолио","Контакты","Футер"]},
  {id:3,name:"Портфолио",desc:"Для дизайнеров, фотографов, разработчиков.",complex:"medium",n:"6-7 блоков", blocks:["Hero","О себе","Проекты с фильтрацией","Модальные окна","Навыки","Отзывы","Контакты"]},
  {id:4,name:"Блог",desc:"Личный или корпоративный блог.",complex:"hard",n:"5-6 блоков", blocks:["Лента постов","Категории","Полная статья","Поиск","Подписка","Комментарии"]},
  {id:5,name:"Корпоративный сайт",desc:"Полноценный сайт компании.",complex:"hard",n:"6-7 страниц", blocks:["Главная","О нас","Услуги","Кейсы","Блог","Контакты","Вакансии"]},
  {id:6,name:"Интернет-магазин",desc:"Каталог, корзина, заказы.",complex:"hard",n:"5-6 страниц", blocks:["Каталог с фильтрами","Карточка товара","Корзина","Оформление заказа","Страница спасибо"]},
  {id:7,name:"Промо / Акция",desc:"Яркий сайт для рекламы.",complex:"easy",n:"5 блоков", blocks:["Таймер отсчёта","Анимированный фон","Что получите","Тарифы","Форма"]},
  {id:8,name:"Документация / Wiki",desc:"База знаний, инструкции.",complex:"hard",n:"4 блока", blocks:["Боковое меню","Поиск","Статья с оглавлением","Тёмная тема"]},
  {id:9,name:"Telegram-лендинг",desc:"Для раскрутки канала или бота.",complex:"easy",n:"5 блоков", blocks:["Hero с названием","О канале","Цифры","Отзывы","Кнопка подписки"]},
  {id:10,name:"Event / Мероприятие",desc:"Конференция, вебинар.",complex:"medium",n:"7 блоков", blocks:["Hero с датой","Программа","Спикеры","Расписание","Билеты","Регистрация","FAQ"]},
  {id:11,name:"Сайт-каталог",desc:"Каталог с фильтрами и поиском.",complex:"hard",n:"5 страниц", blocks:["Категории","Список товаров","Карточка","Поиск","Фильтры"]},
  {id:12,name:"Сайт-услуга",desc:"Продвижение одной услуги.",complex:"easy",n:"6-7 блоков", blocks:["Hero","Как работаю","Цены","Портфолио","Отзывы","Форма","FAQ"]},
  {id:13,name:"Online CV / Резюме",desc:"Сайт-резюме для работы.",complex:"easy",n:"6 блоков", blocks:["Hero","О себе","Опыт","Навыки","Проекты","Контакты"]},
  {id:14,name:"Membership",desc:"Контент по подписке.",complex:"hard",n:"5 страниц", blocks:["Тарифы","Вход","Личный кабинет","Закрытый контент","FAQ"]},
  {id:15,name:"Коучинг / Курс",desc:"Лендинг для курса.",complex:"medium",n:"7 блоков", blocks:["Hero","Для кого","Программа","Результаты","Цены","Форма","FAQ"]},
  {id:16,name:"Фриланс-портфолио",desc:"Портфолио с биржами.",complex:"easy",n:"6 блоков", blocks:["Статус","Стек","Проекты","Статистика","Отзывы","Ссылки на биржи"]},
  {id:17,name:"Стартап-лендинг",desc:"Для презентации инвесторам.",complex:"medium",n:"8 блоков", blocks:["Метрики","Проблема→Решение","Рынок","Команда","График","Раунд","CTA"]},
  {id:18,name:"App-landing",desc:"Продвижение приложения.",complex:"medium",n:"5 блоков", blocks:["Мокап телефона","Скриншоты","Функции","Кнопки магазинов","Отзывы"]},
  {id:19,name:"Лендинг для бота",desc:"Сайт для Telegram/Discord бота.",complex:"easy",n:"5 блоков", blocks:["Имя бота","Функции","Скриншоты","Как начать","Кнопка запуска"]},
  {id:20,name:"Недвижимость",desc:"Продажа квартиры, дома.",complex:"medium",n:"7 блоков", blocks:["Фото+цена","Характеристики","Галерея","Планировка","Форма звонка","Карта"]},
  {id:21,name:"Ресторан / Меню",desc:"Сайт кафе с меню.",complex:"medium",n:"6-7 блоков", blocks:["Главная","Меню с ценами","О нас","Бронь","Галерея","Отзывы","Карта"]},
  {id:22,name:"Фитнес / Тренер",desc:"Сайт тренера.",complex:"medium",n:"6 блоков", blocks:["Hero","О тренере","Программы","Расписание","Результаты","Форма записи"]},
  {id:23,name:"Салон красоты",desc:"Сайт с прайсом и записью.",complex:"medium",n:"7-8 блоков", blocks:["Услуги","Мастера","Портфолио","Прайс","Онлайн-запись","Отзывы","Контакты"]},
  {id:24,name:"Клиника / Врач",desc:"Сайт медицинского центра.",complex:"medium",n:"6-7 страниц", blocks:["Главная","О клинике","Врачи","Услуги","Запись","Контакты"]},
  {id:25,name:"Digital-агентство",desc:"Сайт агентства.",complex:"medium",n:"7-8 страниц", blocks:["Цифры","Услуги","Кейсы","Команда","Отзывы","Блог","Контакты"]},
  {id:26,name:"SaaS / Сервис",desc:"Лендинг онлайн-сервиса.",complex:"hard",n:"7-8 блоков", blocks:["Hero","Демо","Функции","Как работает","Тарифы","Интеграции","Регистрация"]},
  {id:27,name:"Коворкинг",desc:"Сайт коворкинга.",complex:"medium",n:"6 блоков", blocks:["Тарифы","Галерея","Удобства","Мероприятия","Бронь","Карта"]},
  {id:28,name:"Туризм",desc:"Сайт туров и путешествий.",complex:"medium",n:"6-7 блоков", blocks:["Направления","Страница тура","Календарь","О гиде","Бронь","FAQ"]},
  {id:29,name:"Цифровые товары",desc:"Магазин шаблонов, курсов.",complex:"hard",n:"6 страниц", blocks:["Категории","Каталог","Карточка","Корзина","Оформление","Личный кабинет"]},
  {id:30,name:"Новостной портал",desc:"Новостной сайт.",complex:"hard",n:"6-7 страниц", blocks:["Лента новостей","Категории","Полная статья","Поиск","Подписка","Комментарии"]}
];

const COMPLEX_LABELS = {easy:"Простой",medium:"Средний",hard:"Сложный"};
const COMPLEX_COLORS = {easy:"#4ade80",medium:"#fbbf24",hard:"#fb7185"};

// ===== AI Content Generator =====
// Generates all text content based on user's description
function generateSiteContent(description, template) {
  const d = description.toLowerCase();
  const words = d.split(/[\s,.]/).filter(w => w.length > 2);

  // Extract key themes
  const themes = {
    isBusiness: /компани|бизнес|фирм|предприяти|организаци/.test(d),
    isPersonal: /личн|себ|портфолио|фотограф|дизайнер|разработчик|фриланс/.test(d),
    isProduct: /продукт|товар|услуг|сервис/.test(d),
    isTech: /технолог|it|софт|програм|сайт|апп|приложени/.test(d),
    isCreative: /креатив|дизайн|арт|фото|творче/.test(d),
    isHealth: /фитнес|тренер|спорт|салон|красот|клиник|врач/.test(d),
    isFood: /ресторан|кафе|меню|еда|кухн/.test(d),
    isRealEstate: /недвижим|квартир|дом/.test(d),
    isEducation: /курс|коучинг|обучени|школ/.test(d),
    isEvent: /мероприят|конференц|event|вебинар/.test(d),
  };

  const siteName = extractSiteName(description, template.name);
  const tagline = generateTagline(description, themes);
  const aboutText = generateAbout(description, template, themes);
  const features = generateFeatures(description, themes);
  const services = generateServices(description, themes);
  const portfolio = generatePortfolio(description, themes);
  const pricing = generatePricing(description, themes);
  const reviews = generateReviews(description);
  const faq = generateFAQ(description, themes);
  const team = generateTeam(description, themes);
  const stats = generateStats(description, themes);

  return {
    siteName, tagline, aboutText, aboutTitle: 'О нас',
    featuresTitle: 'Наши преимущества',
    servicesTitle: 'Что мы предлагаем',
    portfolioTitle: 'Наши проекты',
    pricingTitle: 'Тарифы',
    reviewsTitle: 'Отзывы клиентов',
    faqTitle: 'Часто задаваемые вопросы',
    contactTitle: 'Связаться с нами',
    galleryTitle: 'Галерея',
    teamTitle: 'Наша команда',
    scheduleTitle: 'Расписание',
    ctaText: 'Готовы начать?',
    ctaBtn: 'Связаться',
    features, services, portfolio, pricing, reviews, faq, team, stats,
    aboutTitle: themes.isBusiness ? 'О компании' : themes.isPersonal ? 'О себе' : 'О нас',
    featuresTitle: themes.isTech ? 'Возможности' : themes.isProduct ? 'Преимущества' : 'Почему мы',
    servicesTitle: themes.isBusiness ? 'Наши услуги' : themes.isCreative ? 'Что я делаю' : 'Услуги',
    portfolioTitle: themes.isCreative ? 'Мои работы' : 'Наши проекты',
    pricingTitle: themes.isBusiness ? 'Тарифы' : 'Стоимость',
  };
}

function extractSiteName(desc, fallback) {
  // Try to extract a name from "называется ...", "имя ...", "сайт для ..."
  const match = desc.match(/называется\s+[""']?([^""'.!?]+)/i) ||
                desc.match(/сайт\s+(?:для\s+)?[""']?([^""'.!?]+)/i) ||
                desc.match(/проект\s+[""']?([^""'.!?]+)/i);
  if (match) return match[1].trim().split(/\s/).slice(0,3).join(' ');
  return fallback;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateTagline(desc, themes) {
  const templates = [
    `Современные цифровые решения для вашего бизнеса`,
    `Креативный подход и профессиональное исполнение`,
    `Разработка, которая приносит результат`,
    `Качественно. Быстро. Надёжно.`,
    `Ваш успех — наша работа`,
    `Сделано с душой и вниманием к деталям`,
  ];
  if (themes.isTech) return `Технологии, которые работают на вас`;
  if (themes.isCreative) return `Креатив, вдохновение, результат`;
  if (themes.isHealth) return `Забота о вас — наша миссия`;
  if (themes.isFood) return `Вкусно, как дома`;

  const words = desc.split(/\s+/);
  // Build a tagline from description keywords
  const keyWords = words.filter(w => w.length > 3).slice(0,3);
  if (keyWords.length >= 2) {
    return capitalizeFirst(`${keyWords[0]} • ${keyWords[1]} • качество`);
  }
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateAbout(desc, template, themes) {
  const base = [
    `Мы создаём современные цифровые продукты, которые помогают бизнесу расти и развиваться. Наш подход — сочетание креативного дизайна, продуманного UX и чистого кода.`,
    `Наша команда специализируется на создании сайтов и веб-сервисов под ключ. Мы верим, что хороший сайт — это инструмент, который приносит реальную пользу бизнесу.`,
  ];

  let about = base[0];
  if (themes.isPersonal) {
    about = `Я занимаюсь созданием современных цифровых продуктов. Мой подход — внимание к деталям, чистый код и продуманный дизайн. Каждый проект — это решение конкретной задачи.`;
  } else if (themes.isTech) {
    about = `Мы разрабатываем технологичные решения для бизнеса. Используем современный стек технологий, следим за трендами и внедряем лучшие практики.`;
  } else if (themes.isCreative) {
    about = `Мы создаём креативные проекты, которые выделяются на фоне конкурентов. Дизайн, эстетика, внимание к каждой детали — вот что нас отличает.`;
  }

  const descWords = desc.split(/[.!?]/).filter(s => s.trim().length > 10);
  if (descWords.length > 0) {
    about += `\n\n${descWords[0].trim()}.`;
  }

  return about;
}

function generateFeatures(desc, themes) {
  const defaults = [
    {title:"Современный дизайн",desc:"Актуальные тренды и стильная анимация"},
    {title:"Быстрая загрузка",desc:"Оптимизированный код без лишнего"},
    {title:"Адаптивность",desc:"Идеально на телефонах, планшетах и ПК"},
    {title:"SEO-дружелюбность",desc:"Правильная структура для поисковиков"},
  ];
  if (themes.isTech) {
    return [
      {title:"Современный стек",desc:"React, Next.js, TypeScript, Node.js"},
      {title:"Масштабируемость",desc:"Архитектура, готовая к росту"},
      {title:"Производительность",desc:"Lighthouse 95+ из коробки"},
      {title:"API-first подход",desc:"Готовая интеграция с любыми сервисами"},
    ];
  }
  if (themes.isCreative) {
    return [
      {title:"Уникальный дизайн",desc:"Каждый проект — индивидуальный"},
      {title:"Внимание к деталям",desc:"Пиксель-перфект вёрстка"},
      {title:"Креативные решения",desc:"Нестандартный подход к задачам"},
      {title:"Сроки",desc:"Сдаём проекты вовремя"},
    ];
  }
  if (themes.isHealth) {
    return [
      {title:"Профессионализм",desc:"Опытные специалисты своего дела"},
      {title:"Индивидуальный подход",desc:"Учитываем особенности каждого клиента"},
      {title:"Современное оборудование",desc:"Новейшие технологии и методики"},
      {title:"Комфорт",desc:"Уютная атмосфера и внимательное отношение"},
    ];
  }
  return defaults;
}

function generateServices(desc, themes) {
  const defaults = [
    {title:"Разработка сайтов",desc:"Создаём сайты с нуля под ключ"},
    {title:"Веб-дизайн",desc:"Продуманный интерфейс и UX"},
    {title:"Поддержка",desc:"Техподдержка и доработки"},
  ];
  if (themes.isBusiness) {
    return [
      {title:"Корпоративные сайты",desc:"Представительство вашей компании в сети"},
      {title:"Интернет-магазины",desc:"Полноценная платформа для продаж"},
      {title:"CRM-интеграция",desc:"Подключение к вашим бизнес-системам"},
    ];
  }
  if (themes.isCreative) {
    return [
      {title:"Веб-дизайн",desc:"Индивидуальный дизайн с нуля"},
      {title:"Фирменный стиль",desc:"Логотип, айдентика, брендинг"},
      {title:"UI/UX консалтинг",desc:"Аудит и улучшение интерфейсов"},
    ];
  }
  if (themes.isHealth) {
    return [
      {title:"Консультация",desc:"Первичный приём и диагностика"},
      {title:"Лечение",desc:"Современные методики терапии"},
      {title:"Профилактика",desc:"Регулярные осмотры и рекомендации"},
    ];
  }
  return defaults;
}

function generatePortfolio(desc, themes) {
  return [
    {title:"Проект Alpha",desc:"Разработка корпоративного портала"},
    {title:"Проект Beta",desc:"Интернет-магазин с нуля"},
    {title:"Проект Gamma",desc:"Лендинг с конверсией 12%"},
  ];
}

function generatePricing(desc, themes) {
  return [
    {name:"Базовый",price:"9 900",desc:"Для старта и небольших проектов"},
    {name:"Стандарт",price:"24 900",desc:"Для растущего бизнеса"},
    {name:"Премиум",price:"49 900",desc:"Максимум возможностей"},
  ];
}

function generateReviews(desc) {
  return [
    {name:"Алексей",text:"Отличная работа! Сделали быстро и качественно."},
    {name:"Мария",text:"Очень довольна результатом. Рекомендую!"},
    {name:"Дмитрий",text:"Профессиональный подход и внимание к деталям."},
  ];
}

function generateFAQ(desc, themes) {
  return [
    {q:"Сколько времени занимает разработка?",a:"В среднем 40 минут на генерацию и до 2 минут на публикацию."},
    {q:"Какие условия оплаты?",a:"Предоплата 50%, остальное после сдачи проекта."},
    {q:"Делаете правки?",a:"Да, мы предоставляем бесплатные правки в течение недели."},
  ];
}

function generateTeam(desc, themes) {
  return [
    {name:"Илья",role:"Разработчик"},
    {name:"Анна",role:"Дизайнер"},
    {name:"Максим",role:"Project Manager"},
  ];
}

function generateStats(desc, themes) {
  return [
    {num:"100+",label:"Проектов"},
    {num:"50+",label:"Клиентов"},
    {num:"98%",label:"Довольных"},
  ];
}

// ===== Template matcher =====
function matchTemplate(description) {
  const q = description.toLowerCase();
  const words = q.split(/[\s,.]/).filter(Boolean);

  const scored = TEMPLATES.map(t => {
    let score = 0;
    const searchSpace = (t.name + ' ' + t.desc + ' ' + t.blocks.join(' ')).toLowerCase();
    for (const w of words) {
      if (w.length < 2) continue;
      if (searchSpace.includes(w)) score += 2;
      if (t.name.toLowerCase().includes(w)) score += 5;
      if (t.desc.toLowerCase().includes(w)) score += 3;
      if (t.blocks.some(b => b.toLowerCase().includes(w))) score += 2;
    }
    const kw = [
      ['магазин','Интернет-магазин'],['лендинг','Лендинг'],
      ['визитка','Сайт-визитка'],['портфолио','Портфолио'],
      ['блог','Блог'],['корпоратив','Корпоративный'],
      ['telegram','Telegram'],['бот','бота'],
      ['ресторан','Ресторан'],['кафе','Ресторан'],
      ['фитнес','Фитнес'],['тренер','Тренер'],
      ['салон','Салон'],['красот','красоты'],
      ['клиник','Клиника'],['врач','Врач'],
      ['агентств','агентство'],['коворкинг','Коворкинг'],
      ['туризм','Туризм'],['event','Event'],
      ['мероприят','Мероприятие'],['промо','Промо'],
      ['недвижим','Недвижимость'],['резюме','CV'],
      ['коучинг','Коучинг'],['курс','Курс'],
      ['стартап','Стартап'],['app','App'],
      ['saas','SaaS'],['сервис','Сервис'],
      ['меню','Меню'],['новост','Новостной'],
      ['лендинг','Лендинг'],['лендинг','Лендинг'],
      ['лендинг','Лендинг'],
    ];
    for (const [k, name] of kw) {
      if (q.includes(k) && t.name.includes(name)) score += 5;
    }
    return { template: t, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].score > 0 ? scored[0].template : TEMPLATES[0];
}

// ===== Block type classification =====
const BLOCK_TYPES = {
  "Hero с CTA":"hero","Hero":"hero","Hero с названием":"hero","Главная":"hero","Hero с датой":"hero",
  "О продукте":"about","О себе":"about","О нас":"about","О канале":"about","О тренере":"about","О гиде":"about","О клинике":"about",
  "Преимущества":"features","Что получите":"features","Функции":"features","Удобства":"features","Для кого":"features",
  "Услуги":"services","Стек":"services",
  "Портфолио":"portfolio","Проекты с фильтрацией":"portfolio","Проекты":"portfolio","Кейсы":"portfolio",
  "Тарифы":"pricing","Цены":"pricing","Билеты":"pricing","Раунд":"pricing","Прайс":"pricing",
  "Отзывы":"reviews",
  "FAQ":"faq",
  "Форма захвата":"contact","Форма":"contact","Форма звонка":"contact","Регистрация":"contact","Форма записи":"contact",
  "Контакты":"contact","Ссылки на биржи":"contact","Онлайн-запись":"contact","Кнопка подписки":"contact","Запись":"contact","Бронь":"contact",
  "Футер":"footer",
  "Галерея":"gallery",
  "Цифры":"stats","Статистика":"stats","Метрики":"stats",
  "Команда":"team","Мастера":"team","Спикеры":"team","Врачи":"team",
  "Расписание":"schedule","График":"schedule","Программа":"schedule","Как работаю":"schedule",
  "CTA":"cta","Проблема→Решение":"cta",
  "Навыки":"skills","Программы":"programs","Результаты":"results",
  "Имя бота":"bot-hero","Кнопка запуска":"cta",
  "Карта":"contact","Планировка":"gallery","Характеристики":"features",
};

// ===== Block renderers with color support =====
// Each renders a block and accepts { accent, siteName, ...text }

function renderHero(cfg) {
  const c = cfg.accent || '#ffd700';
  const st = cfg.siteName || 'My Site';
  const sub = cfg.tagline || '';
  return {
    html: `<section class="b b-hero"><div class="b-hero-bg"></div><div class="b-hero-c"><h1>${st}</h1>${sub?`<p class="b-hero-sub">${sub}</p>`:''}<a href="#" class="b-btn" style="background:${c};color:#0a0a12;">Начать</a></div></section>`,
    css: `.b-hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:40px 24px;background:#07070d;}.b-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 40% at 50% 45%,${c}08 0%,transparent 70%);}.b-hero-c{position:relative;text-align:center;max-width:720px;}.b-hero h1{font-size:clamp(48px,10vw,96px);font-weight:900;line-height:1.05;letter-spacing:-2px;margin-bottom:16px;background:linear-gradient(135deg,#f1f5f9,${c});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}.b-hero-sub{font-size:clamp(18px,3vw,28px);color:#94a3b8;margin-bottom:32px;}.b-btn{display:inline-flex;padding:18px 44px;border-radius:14px;font-size:18px;font-weight:700;text-decoration:none;transition:all .3s;}.b-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px ${c}30;}`
  };
}

function renderAbout(cfg) {
  return {
    html: `<section class="b b-about"><div class="b-about-inner"><h2>${cfg.aboutTitle||'О нас'}</h2>${(cfg.aboutText||'').split('\n').filter(Boolean).map(p=>`<p>${p}</p>`).join('')}</div></section>`,
    css: `.b-about{padding:100px 24px;max-width:800px;margin:0 auto;}.b-about-inner{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:24px;padding:48px;}.b-about h2{font-size:36px;font-weight:800;margin-bottom:16px;color:#f1f5f9;}.b-about p{font-size:17px;color:#94a3b8;line-height:1.8;margin-bottom:12px;}`
  };
}

function renderFeatures(cfg) {
  const items = cfg.features||[{title:"Преимущество",desc:"Описание"}];
  const c = cfg.accent||'#ffd700';
  return {
    html: `<section class="b b-features"><h2>${cfg.featuresTitle||'Преимущества'}</h2><div class="b-grid3">${items.map((f,i)=>`<div class="b-card"><div class="b-card-num" style="color:${c}">${String(i+1).padStart(2,'0')}</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('')}</div></section>`,
    css: `.b-features{padding:100px 24px;max-width:1100px;margin:0 auto;}.b-features h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;}.b-card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:20px;padding:32px;transition:all .4s;}.b-card:hover{transform:translateY(-6px);border-color:${c}15;}.b-card-num{font-size:13px;font-weight:800;margin-bottom:8px;}.b-card h3{font-size:20px;font-weight:700;margin-bottom:8px;color:#f1f5f9;}.b-card p{font-size:15px;color:#64748b;line-height:1.6;}`
  };
}

function renderServices(cfg) {
  return {
    html: `<section class="b b-services"><h2>${cfg.servicesTitle||'Услуги'}</h2><div class="b-grid3">${(cfg.services||[]).map(f=>`<div class="b-card b-serv"><div class="b-serv-icon">✦</div><h3>${f.title}</h3><p>${f.desc}</p></div>`).join('')}</div></section>`,
    css: `.b-serv{text-align:center;}.b-serv-icon{width:56px;height:56px;border-radius:16px;background:rgba(255,215,0,.06);color:#ffd700;display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 16px;}`
  };
}

function renderPortfolio(cfg) {
  return {
    html: `<section class="b b-portfolio"><h2>${cfg.portfolioTitle||'Проекты'}</h2><div class="b-grid3">${(cfg.portfolio||[]).map(f=>`<div class="b-card b-port-card"><div class="b-port-bg"></div><div class="b-port-body"><h3>${f.title}</h3><p>${f.desc}</p></div></div>`).join('')}</div></section>`,
    css: `.b-port-card{padding:0;overflow:hidden;}.b-port-bg{height:160px;background:linear-gradient(135deg,rgba(255,215,0,.06),rgba(99,102,241,.06));}.b-port-body{padding:24px;}.b-port-body h3{font-size:18px;font-weight:700;margin-bottom:4px;color:#f1f5f9;}.b-port-body p{font-size:14px;color:#64748b;}`
  };
}

function renderPricing(cfg) {
  const c = cfg.accent||'#ffd700';
  return {
    html: `<section class="b b-pricing"><h2>${cfg.pricingTitle||'Тарифы'}</h2><div class="b-grid3">${(cfg.pricing||[]).map((f,i)=>`<div class="b-card b-price${i===1?' b-price-feat':''}"${i===1?` style="border-color:${c}20;background:${c}04"`:''}>${i===1?`<div class="b-price-badge" style="background:${c};color:#0a0a12;">Популярное</div>`:''}<h3>${f.name}</h3><div class="b-price-val" style="color:${c}">${f.price} ₽</div><p>${f.desc}</p><a href="#" class="b-btn-sm" style="background:${c}10;color:${c};">Выбрать</a></div>`).join('')}</div></section>`,
    css: `.b-pricing{padding:100px 24px;max-width:1100px;margin:0 auto;}.b-pricing h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-price{text-align:center;position:relative;padding:36px 28px;}.b-price-feat{transform:scale(1.02);}.b-price-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:12px;font-weight:800;padding:4px 16px;border-radius:100px;}.b-price-val{font-size:42px;font-weight:900;margin:12px 0;}.b-price p{color:#64748b;margin-bottom:20px;font-size:15px;}.b-btn-sm{display:inline-block;padding:10px 28px;border-radius:10px;font-weight:700;text-decoration:none;font-size:15px;transition:all .3s;}.b-btn-sm:hover{transform:translateY(-2px);}`
  };
}

function renderReviews(cfg) {
  return {
    html: `<section class="b b-reviews"><h2>${cfg.reviewsTitle||'Отзывы'}</h2><div class="b-grid3">${(cfg.reviews||[]).map(f=>`<div class="b-card"><div class="b-rev-q">"</div><p class="b-rev-txt">${f.text}</p><div class="b-rev-name">— ${f.name}</div></div>`).join('')}</div></section>`,
    css: `.b-reviews{padding:100px 24px;max-width:1100px;margin:0 auto;}.b-reviews h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-rev-q{font-size:48px;color:rgba(255,215,0,.12);font-weight:900;line-height:1;margin-bottom:4px;}.b-rev-txt{font-size:16px;color:#cbd5e1;font-style:italic;line-height:1.7;margin-bottom:12px;}.b-rev-name{font-size:14px;color:#64748b;font-weight:600;}`
  };
}

function renderFaq(cfg) {
  return {
    html: `<section class="b b-faq"><h2>${cfg.faqTitle||'FAQ'}</h2><div class="b-faq-list">${(cfg.faq||[]).map((f,i)=>`<div class="b-faq-item"><button class="b-faq-q" onclick="this.closest('.b-faq-item').classList.toggle('b-faq-open')"><span>${f.q}</span><span class="b-faq-arrow">↓</span></button><div class="b-faq-a"><p>${f.a}</p></div></div>`).join('')}</div></section>`,
    css: `.b-faq{padding:100px 24px;max-width:800px;margin:0 auto;}.b-faq h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-faq-item{border-bottom:1px solid rgba(255,255,255,.03);}.b-faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 0;background:none;border:none;color:#e2e8f0;font-size:17px;font-weight:600;cursor:pointer;font-family:inherit;text-align:left;}.b-faq-q:hover{color:#ffd700;}.b-faq-arrow{transition:transform .3s;font-size:14px;color:#64748b;}.b-faq-open .b-faq-arrow{transform:rotate(180deg);}.b-faq-a{max-height:0;overflow:hidden;transition:max-height .3s;}.b-faq-open .b-faq-a{max-height:300px;}.b-faq-a p{padding:0 0 20px;color:#94a3b8;font-size:16px;line-height:1.7;}`
  };
}

function renderContact(cfg) {
  const c = cfg.accent||'#ffd700';
  return {
    html: `<section class="b b-contact"><h2>${cfg.contactTitle||'Контакты'}</h2><form class="b-form" onsubmit="event.preventDefault();alert('Спасибо! Мы свяжемся с вами.');"><input type="text" placeholder="Имя" required><input type="email" placeholder="Email" required><textarea rows="4" placeholder="Сообщение" required></textarea><button style="background:${c};color:#0a0a12;">Отправить</button></form></section>`,
    css: `.b-contact{padding:100px 24px;max-width:640px;margin:0 auto;}.b-contact h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-form{display:flex;flex-direction:column;gap:16px;}.b-form input,.b-form textarea{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:16px 20px;font-size:16px;color:#f1f5f9;font-family:inherit;outline:none;}.b-form input:focus,.b-form textarea:focus{border-color:rgba(255,215,0,.2);}.b-form input::placeholder,.b-form textarea::placeholder{color:#475569;}.b-form button{border:none;padding:16px 36px;border-radius:12px;font-size:17px;font-weight:700;cursor:pointer;transition:all .3s;font-family:inherit;}.b-form button:hover{transform:translateY(-2px);box-shadow:0 8px 24px ${c}20;}`
  };
}

function renderFooter(cfg) {
  const name = cfg.siteName||'My Site';
  return {
    html: `<footer class="b-footer"><div class="b-footer-c"><div class="b-footer-brand">${name}</div><div class="b-footer-links"><a href="#">Главная</a><a href="#">О нас</a><a href="#">Контакты</a></div><div class="b-footer-copy">© ${new Date().getFullYear()} ${name}</div></div></footer>`,
    css: `.b-footer{background:rgba(0,0,0,.2);border-top:1px solid rgba(255,255,255,.03);padding:60px 24px 40px;text-align:center;}.b-footer-brand{font-size:24px;font-weight:900;color:#ffd700;margin-bottom:16px;}.b-footer-links{display:flex;gap:24px;justify-content:center;margin-bottom:24px;}.b-footer-links a{color:#64748b;text-decoration:none;font-size:15px;font-weight:600;}.b-footer-links a:hover{color:#e2e8f0;}.b-footer-copy{font-size:14px;color:#334155;}`
  };
}

function renderGallery(cfg) {
  return {
    html: `<section class="b b-gallery"><h2>${cfg.galleryTitle||'Галерея'}</h2><div class="b-gallery-grid">${Array.from({length:6},(_,i)=>`<div class="b-gal-item"><div class="b-gal-ph"></div><span>Фото ${i+1}</span></div>`).join('')}</div></section>`,
    css: `.b-gallery{padding:100px 24px;max-width:1100px;margin:0 auto;}.b-gallery h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;}.b-gal-item{text-align:center;}.b-gal-ph{aspect-ratio:4/3;background:rgba(255,255,255,.03);border-radius:14px;margin-bottom:8px;}.b-gal-item span{font-size:14px;color:#64748b;}`
  };
}

function renderStats(cfg) {
  const c = cfg.accent||'#ffd700';
  return {
    html: `<section class="b b-stats"><div class="b-stats-grid">${(cfg.stats||[]).map(f=>`<div class="b-stat"><div class="b-stat-n" style="color:${c}">${f.num}</div><div class="b-stat-l">${f.label}</div></div>`).join('')}</div></section>`,
    css: `.b-stats{padding:80px 24px;max-width:900px;margin:0 auto;}.b-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;text-align:center;}.b-stat-n{font-size:52px;font-weight:900;letter-spacing:-1px;}.b-stat-l{font-size:16px;color:#64748b;font-weight:600;}`
  };
}

function renderTeam(cfg) {
  return {
    html: `<section class="b b-team"><h2>${cfg.teamTitle||'Команда'}</h2><div class="b-grid3">${(cfg.team||[]).map(f=>`<div class="b-card b-team-card"><div class="b-team-av">${f.name[0]}</div><h3>${f.name}</h3><p>${f.role}</p></div>`).join('')}</div></section>`,
    css: `.b-team-card{text-align:center;}.b-team-av{width:72px;height:72px;border-radius:24px;background:linear-gradient(135deg,#ffd700,#f59e0b);color:#0a0a12;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;margin:0 auto 16px;}.b-team-card h3{margin-bottom:4px;}.b-team-card p{color:#64748b;font-size:15px;}`
  };
}

function renderSchedule(cfg) {
  return {
    html: `<section class="b b-schedule"><h2>${cfg.scheduleTitle||'Расписание'}</h2><div class="b-sched-list">${Array.from({length:4},(_,i)=>`<div class="b-sched-item"><div class="b-sched-time">${9+i*2}:00</div><div class="b-sched-d"></div><div class="b-sched-body"><h3>Событие ${i+1}</h3><p>Описание события</p></div></div>`).join('')}</div></section>`,
    css: `.b-schedule{padding:100px 24px;max-width:700px;margin:0 auto;}.b-schedule h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-sched-list{position:relative;}.b-sched-list::before{content:'';position:absolute;left:94px;top:0;bottom:0;width:1px;background:rgba(255,255,255,.04);}.b-sched-item{display:flex;gap:24px;margin-bottom:28px;}.b-sched-time{width:80px;font-size:15px;font-weight:700;color:#ffd700;text-align:right;padding-top:4px;flex-shrink:0;}.b-sched-d{width:10px;height:10px;border-radius:50%;background:rgba(255,215,0,.15);border:2px solid #ffd700;flex-shrink:0;margin-top:8px;position:relative;z-index:1;}.b-sched-body{flex:1;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:16px;padding:20px;}.b-sched-body h3{font-size:17px;font-weight:700;margin-bottom:4px;color:#f1f5f9;}.b-sched-body p{font-size:14px;color:#64748b;}`
  };
}

function renderCta(cfg) {
  const c = cfg.accent||'#ffd700';
  return {
    html: `<section class="b b-cta"><div class="b-cta-inner"><h2>${cfg.ctaText||'Готовы начать?'}</h2><a href="#" class="b-btn" style="background:${c};color:#0a0a12;">${cfg.ctaBtn||'Связаться'}</a></div></section>`,
    css: `.b-cta{padding:80px 24px;}.b-cta-inner{max-width:700px;margin:0 auto;text-align:center;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:28px;padding:64px 40px;}.b-cta h2{font-size:36px;font-weight:800;margin-bottom:24px;color:#f1f5f9;}`
  };
}

function renderSkills(cfg) {
  return {
    html: `<section class="b b-skills"><h2>Навыки</h2><div class="b-skills-list">${['HTML/CSS','JavaScript','React','Node.js','TypeScript','Git'].map(s=>`<div class="b-skill">${s}</div>`).join('')}</div></section>`,
    css: `.b-skills{padding:100px 24px;max-width:800px;margin:0 auto;}.b-skills h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}.b-skills-list{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}.b-skill{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:100px;padding:10px 24px;font-size:15px;font-weight:600;color:#e2e8f0;}`
  };
}

function renderPrograms(cfg) {
  return {
    html: `<section class="b b-programs"><h2>Программы</h2><div class="b-grid3">${Array.from({length:3},(_,i)=>`<div class="b-card"><h3>Программа ${i+1}</h3><p>Описание программы тренировок</p></div>`).join('')}</div></section>`,
    css: `.b-programs{padding:100px 24px;max-width:1100px;margin:0 auto;}.b-programs h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}`
  };
}

function renderResults(cfg) {
  return {
    html: `<section class="b b-results"><h2>Результаты</h2><div class="b-grid3">${Array.from({length:3},(_,i)=>`<div class="b-card"><div class="b-stat-n" style="font-size:36px;">${['-5кг','+30%','95%'][i]}</div><p>${['Потеря веса','Рост силы','Довольных клиентов'][i]}</p></div>`).join('')}</div></section>`,
    css: `.b-results{padding:100px 24px;max-width:1100px;margin:0 auto;}.b-results h2{font-size:36px;font-weight:800;text-align:center;margin-bottom:48px;color:#f1f5f9;}`
  };
}

function renderBotHero(cfg) {
  const c = cfg.accent||'#ffd700';
  return {
    html: `<section class="b b-hero"><div class="b-hero-bg"></div><div class="b-hero-c"><div class="b-bot-icon">🤖</div><h1>${cfg.siteName||'Bot'}</h1><p class="b-hero-sub">Умный бот для ваших задач</p><a href="#" class="b-btn" style="background:${c};color:#0a0a12;">Запустить</a></div></section>`,
    css: `.b-hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:40px 24px;background:#07070d;}.b-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 40% at 50% 45%,rgba(255,215,0,.06),transparent 70%);}.b-hero-c{position:relative;text-align:center;max-width:720px;}.b-bot-icon{font-size:72px;margin-bottom:16px;}.b-hero h1{font-size:clamp(48px,10vw,96px);font-weight:900;color:#f1f5f9;margin-bottom:16px;}.b-hero-sub{font-size:clamp(18px,3vw,28px);color:#94a3b8;margin-bottom:32px;}.b-btn{display:inline-flex;padding:18px 44px;border-radius:14px;font-size:18px;font-weight:700;text-decoration:none;transition:all .3s;}.b-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px ${c}30;}`
  };
}

const RENDERER_MAP = {
  hero: renderHero, about: renderAbout, features: renderFeatures,
  services: renderServices, portfolio: renderPortfolio, pricing: renderPricing,
  reviews: renderReviews, faq: renderFaq, contact: renderContact,
  footer: renderFooter, gallery: renderGallery, stats: renderStats,
  team: renderTeam, schedule: renderSchedule, cta: renderCta,
  skills: renderSkills, programs: renderPrograms, results: renderResults,
  "bot-hero": renderBotHero
};

// ===== Site Generator =====
function generateSite(template, config) {
  let html = '', css = '';
  const blocks = template.blocks;

  for (const blockName of blocks) {
    const type = BLOCK_TYPES[blockName];
    const renderer = RENDERER_MAP[type];
    if (!renderer) continue;
    const result = renderer(config);
    html += result.html + '\n';
    css += result.css + '\n';
  }

  const fullCss = `*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#07070d;color:#f1f5f9;overflow-x:hidden;}
::selection{background:${config.accent||'#ffd700'};color:#0a0a12;}
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(255,215,0,.15);border-radius:3px;}
html{scroll-behavior:smooth;}
a{color:inherit;text-decoration:none;}
.b{padding:80px 24px;max-width:1200px;margin:0 auto;}
${css}
`;

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${config.siteName||template.name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>${fullCss}</style>
</head>
<body>
${html}
</body>
</html>`;
}
