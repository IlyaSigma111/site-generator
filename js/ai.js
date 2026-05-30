// ===== Real AI via Hugging Face Inference API =====
// Uses flan-t5-large (multilingual, 780M) for Russian text generation
// Free tier: no key needed, but rate-limited. User can optionally provide a HF token.

const AI = {
  apiBase: 'https://api-inference.huggingface.co/models/',
  model: 'google/flan-t5-large',
  headers: { 'Content-Type': 'application/json' },
  loaded: true,

  setToken(token) {
    if (token) {
      this.headers['Authorization'] = 'Bearer ' + token;
    } else {
      delete this.headers['Authorization'];
    }
  },

  async generate(prompt) {
    const resp = await fetch(this.apiBase + this.model, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 80,
          temperature: 0.8,
          top_p: 0.9,
          do_sample: true,
          repetition_penalty: 1.15,
        },
      }),
    });
    if (!resp.ok) {
      const err = await resp.text().catch(() => '');
      throw new Error(`HTTP ${resp.status}: ${err.slice(0, 200)}`);
    }
    const data = await resp.json();
    const text = (Array.isArray(data) ? data[0]?.generated_text : data?.generated_text) || '';
    // Remove the input prompt from output (flan-t5 echoes it)
    return text.replace(prompt, '').trim();
  },

  async generateContent(description, template, onStatus) {
    const setStatus = (s) => { if (onStatus) onStatus(s); };
    const desc = description.trim();

    setStatus({ text: '🤖 ИИ анализирует запрос...', progress: 5 });

    // 1. Site name
    const namePrompt = `Придумай короткое название (2-3 слова) для сайта по описанию: "${desc}". Только название.`;
    let siteName = '';
    try {
      siteName = await this.generate(namePrompt);
      if (siteName.length < 2 || siteName.length > 60) siteName = '';
    } catch (e) {
      siteName = '';
    }

    const sn = siteName || template.name;
    setStatus({ text: `🤖 Название: ${sn}`, progress: 18 });

    // 2. Tagline
    const tagPrompt = `Придумай слоган (одно предложение) для сайта "${sn}". Описание: "${desc}".`;
    let tagline = '';
    try {
      tagline = await this.generate(tagPrompt);
      if (tagline.length < 3) tagline = '';
    } catch (e) {
      tagline = '';
    }
    setStatus({ text: '🤖 Генерация слогана...', progress: 30 });

    // 3. About text
    const aboutPrompt = `Напиши текст "О нас" для сайта "${sn}", 2-3 предложения. Описание: "${desc}".`;
    let aboutText = '';
    try {
      aboutText = await this.generate(aboutPrompt);
      if (aboutText.length < 10) aboutText = '';
    } catch (e) {
      aboutText = '';
    }
    setStatus({ text: '🤖 Генерация контента...', progress: 45 });

    // 4. Features
    const featPrompt = `Назови 4 ключевых преимущества для сайта "${sn}". Каждый пункт с новой строки с "-". Описание: "${desc}".`;
    let features = [];
    try {
      const featRaw = await this.generate(featPrompt);
      const lines = featRaw.split('\n').filter(l => l.trim().startsWith('-'));
      features = lines.slice(0, 4).map(l => {
        const t = l.replace(/^-\s*/, '').trim();
        const parts = t.split(/[,:;—-]/).map(s => s.trim()).filter(Boolean);
        return { title: parts[0] || 'Преимущество', desc: parts[1] || 'Описание' };
      });
    } catch (e) {
      features = [];
    }
    if (features.length < 2) {
      features = [
        { title: 'Современный дизайн', desc: 'Актуальные тренды' },
        { title: 'Адаптивность', desc: 'На всех устройствах' },
      ];
    }
    setStatus({ text: '🤖 Генерация преимуществ...', progress: 60 });

    // 5. Services
    const servPrompt = `Назови 3 услуги для сайта "${sn}". Каждая с новой строки. Описание: "${desc}".`;
    let services = [];
    try {
      const servRaw = await this.generate(servPrompt);
      const lines = servRaw.split('\n').filter(Boolean).slice(0, 3);
      services = lines.map(l => {
        const t = l.replace(/^\d+[\.\)]\s*/, '').trim();
        const parts = t.split(/[,:;—-]/).map(s => s.trim()).filter(Boolean);
        return { title: parts[0] || 'Услуга', desc: parts[1] || 'Описание' };
      });
    } catch (e) {
      services = [];
    }
    if (services.length === 0) {
      services = [
        { title: 'Разработка', desc: 'Создание сайтов' },
        { title: 'Дизайн', desc: 'Продуманный интерфейс' },
        { title: 'Поддержка', desc: 'Техподдержка' },
      ];
    }
    setStatus({ text: '🤖 Сборка страницы...', progress: 75 });

    const content = {
      siteName: sn,
      tagline: tagline || 'Современные цифровые решения',
      aboutText: aboutText || `Мы создаём сайты по описанию. ${desc}`,
      aboutTitle: 'О нас',
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
      ctaText: `Готовы начать с ${sn}?`,
      ctaBtn: 'Связаться',
      features,
      services,
      portfolio: [
        { title: `${sn} — проект 1`, desc: 'Разработка под ключ' },
        { title: `${sn} — проект 2`, desc: 'Дизайн и вёрстка' },
        { title: `${sn} — проект 3`, desc: 'Оптимизация' },
      ],
      pricing: [
        { name: 'Базовый', price: '9 900', desc: 'Для старта' },
        { name: 'Стандарт', price: '24 900', desc: 'Для бизнеса' },
        { name: 'Премиум', price: '49 900', desc: 'Максимум' },
      ],
      reviews: [
        { name: 'Алексей', text: 'Отличная работа! Сделали быстро.' },
        { name: 'Мария', text: 'Очень довольна результатом.' },
        { name: 'Дмитрий', text: 'Профессиональный подход.' },
      ],
      faq: [
        { q: 'Сколько времени занимает разработка?', a: 'AI генерирует сайт за 40 минут.' },
        { q: 'Нужен ли хостинг?', a: 'GitHub Pages — бесплатно.' },
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

    setStatus({ text: '✅ ИИ сгенерировал контент!', progress: 100 });
    return content;
  },
};
