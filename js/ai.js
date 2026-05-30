// ===== Real AI via GitHub Models =====
// Uses the user's GitHub token (same as for deployment)
// Endpoint: https://models.inference.ai.azure.com/chat/completions
// Model: gpt-4o-mini (free, fast, multilingual, GPT-4 level)

const AI = {
  ghToken: '',

  setToken(token) { this.ghToken = token; },
  get hasKey() { return !!this.ghToken; },

  async call(messages) {
    if (!this.ghToken) throw new Error('GitHub token required');

    const resp = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.ghToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 150,
        temperature: 0.8,
        top_p: 0.9,
      }),
    });

    if (!resp.ok) {
      const err = await resp.text().catch(() => '');
      throw new Error(`GitHub Models HTTP ${resp.status}: ${err.slice(0, 200)}`);
    }

    const data = await resp.json();
    return (data?.choices?.[0]?.message?.content || '').trim();
  },

  async generateContent(description, template, onStatus) {
    const setStatus = (s) => { if (onStatus) onStatus(s); };
    const desc = description.trim();
    const sys = 'Ты — профессиональный веб-копирайтер. Отвечай кратко и по делу.';

    setStatus({ text: '🤖 ИИ анализирует запрос...', progress: 5 });

    // 1. Site name
    const nameMsg = [
      { role: 'system', content: sys },
      { role: 'user', content: `Придумай короткое название (2-4 слова) для сайта по описанию: "${desc}". Только название.` },
    ];
    const siteName = await this.call(nameMsg) || template.name;
    setStatus({ text: `✅ Название: ${siteName}`, progress: 20 });

    // 2. Tagline
    const tagMsg = [
      { role: 'system', content: sys },
      { role: 'user', content: `Придумай слоган (одна строка, до 10 слов) для сайта "${siteName}". Описание: "${desc}". Только слоган.` },
    ];
    const tagline = await this.call(tagMsg);
    setStatus({ text: '🤖 Генерация контента...', progress: 35 });

    // 3. About
    const aboutMsg = [
      { role: 'system', content: sys },
      { role: 'user', content: `Напиши текст "О компании" для сайта "${siteName}", 2-4 предложения, по-русски. Учти описание: "${desc}".` },
    ];
    const aboutText = await this.call(aboutMsg);
    setStatus({ text: '🤖 Генерация преимуществ...', progress: 50 });

    // 4. Features
    const featMsg = [
      { role: 'system', content: sys },
      { role: 'user', content: `Перечисли 4 преимущества для сайта "${siteName}" в формате "Заголовок: описание". Каждый с новой строки. Учти: "${desc}".` },
    ];
    const featRaw = await this.call(featMsg);
    const featLines = featRaw.split('\n').filter(l => l.trim() && !l.match(/^\d+[\.\)]/)).slice(0, 4);
    const features = featLines.map(l => {
      const parts = l.replace(/^[-*\s]+/, '').split(/[:;]/).map(s => s.trim()).filter(Boolean);
      return { title: parts[0] || 'Преимущество', desc: parts[1] || 'Описание' };
    });
    if (features.length < 2) {
      features.push({ title: 'Современный дизайн', desc: 'Актуальные тренды и стиль' });
      features.push({ title: 'Адаптивность', desc: 'Отлично на любых устройствах' });
    }
    setStatus({ text: '🤖 Генерация услуг...', progress: 65 });

    // 5. Services
    const servMsg = [
      { role: 'system', content: sys },
      { role: 'user', content: `Назови 3 услуги для сайта "${siteName}" в формате "Название: описание". Учти: "${desc}".` },
    ];
    const servRaw = await this.call(servMsg);
    const servLines = servRaw.split('\n').filter(l => l.trim() && !l.match(/^\d+[\.\)]/)).slice(0, 3);
    const services = servLines.map(l => {
      const parts = l.replace(/^[-*\s]+/, '').split(/[:;]/).map(s => s.trim()).filter(Boolean);
      return { title: parts[0] || 'Услуга', desc: parts[1] || 'Описание' };
    });
    if (services.length === 0) {
      services.push({ title: 'Разработка', desc: 'Создание сайтов под ключ' });
      services.push({ title: 'Дизайн', desc: 'Продуманный интерфейс' });
      services.push({ title: 'Поддержка', desc: 'Техподдержка и доработки' });
    }

    setStatus({ text: '🤖 Сборка страницы...', progress: 80 });

    return {
      siteName,
      tagline: tagline || 'Современные цифровые решения',
      aboutText: aboutText || `Мы создаём сайты по вашему описанию. ${desc}`,
      aboutTitle: 'О компании',
      featuresTitle: 'Наши преимущества',
      servicesTitle: 'Услуги',
      portfolioTitle: 'Наши проекты',
      pricingTitle: 'Тарифы',
      reviewsTitle: 'Отзывы',
      faqTitle: 'FAQ',
      contactTitle: 'Контакты',
      galleryTitle: 'Галерея',
      teamTitle: 'Команда',
      scheduleTitle: 'Расписание',
      ctaText: `Готовы начать с ${siteName}?`,
      ctaBtn: 'Связаться',
      features,
      services,
      portfolio: [
        { title: `${siteName} — проект 1`, desc: 'Разработка под ключ' },
        { title: `${siteName} — проект 2`, desc: 'Дизайн и вёрстка' },
        { title: `${siteName} — проект 3`, desc: 'Оптимизация и поддержка' },
      ],
      pricing: [
        { name: 'Базовый', price: '9 900', desc: 'Для старта' },
        { name: 'Стандарт', price: '24 900', desc: 'Для бизнеса' },
        { name: 'Премиум', price: '49 900', desc: 'Максимум' },
      ],
      reviews: [
        { name: 'Алексей', text: 'Отличная работа! Сделали быстро и качественно.' },
        { name: 'Мария', text: 'Очень довольна результатом. Рекомендую!' },
        { name: 'Дмитрий', text: 'Профессиональный подход и внимание к деталям.' },
      ],
      faq: [
        { q: 'Сколько времени занимает разработка?', a: 'AI генерирует сайт за 40 минут.' },
        { q: 'Нужен ли хостинг?', a: 'GitHub Pages — бесплатный хостинг.' },
        { q: 'Могу ли я править код?', a: 'Да, полный исходный код ваш.' },
      ],
      team: [
        { name: 'Илья', role: 'Разработчик' },
        { name: 'Анна', role: 'Дизайнер' },
        { name: 'Максим', role: 'PM' },
      ],
      stats: [
        { num: '100+', label: 'Проектов' },
        { num: '50+', label: 'Клиентов' },
        { num: '98%', label: 'Довольных' },
      ],
    };
  },
};
