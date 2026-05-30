// ===== Real AI backends =====
// 1) Gemini API (Google, free: 60 req/min, no credit card)
// 2) Hugging Face Inference API (optional, user provides token)
// 3) Built-in template generator (no key needed)

const AI = {
  geminiKey: '',
  hfToken: '',

  setGeminiKey(key) { this.geminiKey = key; },
  setHfToken(token) { this.hfToken = token; },

  async callGemini(prompt) {
    if (!this.geminiKey) throw new Error('No Gemini key');
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiKey}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topP: 0.9,
          maxOutputTokens: 120,
        },
      }),
    });
    if (!resp.ok) {
      const err = await resp.text().catch(() => '');
      throw new Error(`Gemini HTTP ${resp.status}: ${err.slice(0, 200)}`);
    }
    const data = await resp.json();
    return (data?.candidates?.[0]?.content?.parts?.[0]?.text || '').trim();
  },

  async callHuggingFace(prompt) {
    const headers = { 'Content-Type': 'application/json' };
    if (this.hfToken) headers['Authorization'] = 'Bearer ' + this.hfToken;
    const resp = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-large', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 90, temperature: 0.8, top_p: 0.9, do_sample: true, repetition_penalty: 1.15 },
      }),
    });
    if (!resp.ok) {
      const err = await resp.text().catch(() => '');
      throw new Error(`HF HTTP ${resp.status}: ${err.slice(0, 200)}`);
    }
    const data = await resp.json();
    const text = (Array.isArray(data) ? data[0]?.generated_text : data?.generated_text) || '';
    return text.replace(prompt, '').trim();
  },

  async tryGenerate(prompt, onStatus) {
    // Try Gemini first
    if (this.geminiKey) {
      try {
        if (onStatus) onStatus({ text: '🤖 Gemini генерирует...', progress: 40 });
        const result = await this.callGemini(prompt);
        if (result && result.length > 3) return result;
      } catch (e) {
        console.warn('Gemini error:', e);
        if (onStatus) onStatus({ text: '⚠️ Gemini недоступен, пробую HF...', progress: 30 });
      }
    }
    // Then Hugging Face
    try {
      const result = await this.callHuggingFace(prompt);
      if (result && result.length > 3) return result;
    } catch (e) {
      console.warn('HF error:', e);
    }
    return ''; // All APIs failed
  },

  async generateContent(description, template, onStatus) {
    const setStatus = (s) => { if (onStatus) onStatus(s); };
    const desc = description.trim();

    const gen = async (prompt, label) => {
      setStatus({ text: `🤖 ${label}...`, progress: 30 });
      const result = await this.tryGenerate(prompt, onStatus);
      if (result) setStatus({ text: `✅ ${label}: ${result.slice(0, 40)}...`, progress: 45 });
      return result;
    };

    setStatus({ text: '🤖 ИИ анализирует запрос...', progress: 5 });

    const namePrompt = `Ты — профессиональный копирайтер. Придумай короткое название (2-5 слов) для сайта по описанию: "${desc}". Только название, без кавычек и пояснений.`;
    const siteName = await gen(namePrompt, 'Название') || template.name;

    const tagPrompt = `Придумай слоган (одно предложение, 5-10 слов) для сайта "${siteName}". Описание: "${desc}". Только слоган.`;
    const tagline = await gen(tagPrompt, 'Слоган') || 'Современные цифровые решения';

    const aboutPrompt = `Напиши текст "О компании" для сайта "${siteName}", 2-4 предложения. Используй описание: "${desc}". Пиши по-русски, естественно.`;
    const aboutText = await gen(aboutPrompt, 'О нас') || `Мы создаём сайты по описанию. ${desc}`;

    const featPrompt = `Перечисли 4 преимущества для сайта "${siteName}" в формате "Заголовок: описание". Каждый пункт с новой строки. Учти описание: "${desc}".`;
    let featRaw = await gen(featPrompt, 'Преимущества');
    let features = [];
    if (featRaw) {
      const lines = featRaw.split('\n').filter(Boolean).slice(0, 4);
      features = lines.map(l => {
        const parts = l.split(/[:;—-]/).map(s => s.trim()).filter(Boolean);
        return { title: parts[0] || 'Преимущество', desc: parts[1] || 'Описание' };
      });
    }
    if (features.length < 2) {
      features = [
        { title: 'Современный дизайн', desc: 'Актуальные тренды' },
        { title: 'Адаптивность', desc: 'На всех устройствах' },
      ];
    }

    const servPrompt = `Назови 3 услуги для сайта "${siteName}" в формате "Название: описание". Учти описание: "${desc}".`;
    let servRaw = await gen(servPrompt, 'Услуги');
    let services = [];
    if (servRaw) {
      const lines = servRaw.split('\n').filter(Boolean).slice(0, 3);
      services = lines.map(l => {
        const parts = l.split(/[:;—-]/).map(s => s.trim()).filter(Boolean);
        return { title: parts[0] || 'Услуга', desc: parts[1] || 'Описание' };
      });
    }
    if (services.length === 0) {
      services = [
        { title: 'Разработка', desc: 'Создание сайтов' },
        { title: 'Дизайн', desc: 'Продуманный интерфейс' },
        { title: 'Поддержка', desc: 'Техподдержка' },
      ];
    }

    setStatus({ text: '🤖 Сборка страницы...', progress: 85 });

    return {
      siteName,
      tagline,
      aboutText,
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
        { title: `${siteName} — проект 3`, desc: 'Оптимизация' },
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
