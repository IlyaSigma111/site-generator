// ===== Real AI in browser using Transformers.js =====
// Uses mT5-small (multilingual, 60MB) for Russian text generation
const AI = {
  pipe: null,
  modelName: 'Xenova/mT5-small',
  loaded: false,
  loading: false,
  progress: 0,

  async load(onProgress) {
    if (this.loaded) return;
    if (this.loading) return;
    this.loading = true;
    this.progress = 0;

    try {
      const { pipeline } = globalThis;

      onProgress({ status: 'download', text: 'Загрузка нейросети...', progress: 0 });

      this.pipe = await pipeline('text2text-generation', this.modelName, {
        progress_callback: (p) => {
          if (p.status === 'progress' && p.total > 0) {
            const pct = Math.round((p.loaded / p.total) * 100);
            this.progress = pct;
            onProgress({ status: 'download', text: `Загрузка модели... ${pct}%`, progress: pct });
          }
        },
      });

      this.loaded = true;
      onProgress({ status: 'ready', text: '✅ Нейросеть загружена', progress: 100 });
    } catch (e) {
      this.loaded = false;
      this.loading = false;
      onProgress({ status: 'error', text: '❌ Ошибка загрузки: ' + e.message, progress: 0 });
      throw e;
    }
  },

  async generate(prompt) {
    if (!this.pipe) throw new Error('Model not loaded');
    const result = await this.pipe(prompt, {
      max_new_tokens: 100,
      temperature: 0.9,
      do_sample: true,
      top_p: 0.92,
      repetition_penalty: 1.1,
    });
    return (result[0]?.generated_text || '').trim();
  },

  // Generate website content using real AI
  async generateContent(description, template, onStatus) {
    const setStatus = (s) => { if (onStatus) onStatus(s); };

    setStatus({ text: '🤖 ИИ анализирует запрос...', progress: 10 });

    // 1. Generate site name / headline
    const namePrompt = `Придумай название для сайта по описанию: ${description}. Напиши только название, 2-3 слова.`;
    const name = await this.generate(namePrompt);
    setStatus({ text: `🤖 Название: ${name}`, progress: 25 });

    // 2. Generate tagline
    const tagPrompt = `Придумай слоган для сайта "${name}". Описание: ${description}. Одно предложение.`;
    const tagline = await this.generate(tagPrompt);
    setStatus({ text: `🤖 Генерация слогана...`, progress: 35 });

    // 3. Generate about text
    const aboutPrompt = `Напиши текст "О нас" для сайта "${name}". Кратко, 2-3 предложения. Описание: ${description}`;
    const about = await this.generate(aboutPrompt);
    setStatus({ text: '🤖 Генерация контента...', progress: 50 });

    // 4. Generate features
    const featPrompt = `Перечисли 4 преимущества для сайта "${name}". Каждое начинай с новой строки с "- ". Описание: ${description}`;
    const featText = await this.generate(featPrompt);
    const featLines = featText.split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/, '').trim()).filter(Boolean);
    const features = featLines.slice(0, 4).map((f, i) => ({
      title: f.split(',')[0] || f.split(' — ')[0] || f,
      desc: f.split(',')[1] || f.split(' — ')[1] || `Преимущество ${i + 1}`,
    }));
    if (features.length < 2) {
      features.push({ title: 'Современный дизайн', desc: 'Актуальные тренды и стильная анимация' });
      features.push({ title: 'Адаптивность', desc: 'Идеально на любых устройствах' });
    }
    setStatus({ text: '🤖 Генерация преимуществ...', progress: 65 });

    // 5. Generate services
    const servPrompt = `Перечисли 3 услуги для сайта "${name}". Кратко, с новой строки. Описание: ${description}`;
    const servText = await this.generate(servPrompt);
    const servLines = servText.split('\n').filter(Boolean).slice(0, 3);
    const services = servLines.map((s, i) => ({
      title: s.replace(/^\d+[\.\)]\s*/, '').split(',')[0].trim() || `Услуга ${i + 1}`,
      desc: s.includes(',') ? s.split(',')[1].trim() : `Подробное описание услуги ${i + 1}`,
    }));
    if (services.length === 0) {
      services.push({ title: 'Разработка', desc: 'Создание сайтов под ключ' },
                     { title: 'Дизайн', desc: 'Продуманный интерфейс' },
                     { title: 'Поддержка', desc: 'Техподдержка и доработки' });
    }

    setStatus({ text: '🤖 Сборка страницы...', progress: 80 });

    const siteName = name || template.name;

    const content = {
      siteName,
      tagline,
      aboutText: about || `Мы создаём современные цифровые решения. ${description}`,
      aboutTitle: 'О нас',
      featuresTitle: 'Наши преимущества',
      servicesTitle: 'Услуги',
      portfolioTitle: 'Наши проекты',
      pricingTitle: 'Тарифы',
      reviewsTitle: 'Отзывы',
      faqTitle: 'Часто задаваемые вопросы',
      contactTitle: 'Связаться',
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
        { q: 'Сколько времени занимает разработка?', a: 'AI генерирует сайт за 40 минут, публикация — 2 минуты.' },
        { q: 'Нужен ли хостинг?', a: 'GitHub Pages — бесплатный хостинг.' },
        { q: 'Могу ли я править код?', a: 'Да, вы получаете полный исходный код.' },
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

    setStatus({ text: '✅ ИИ закончил! Страница готова', progress: 100 });
    return content;
  },
};
