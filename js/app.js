const EMBEDDED_GH_TOKEN = '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';

let generatedCode = null;
let currentTemplate = null;
let usedRealAI = false;

const $ = id => document.getElementById(id);

function init() {
  renderTemplateGrid('all');
  setupFilters();

  $('desc-input').addEventListener('input', autoMatch);
  $('generate-btn').addEventListener('click', onGenerate);
  $('deploy-btn').addEventListener('click', onDeploy);
  $('deploy-cancel-btn').addEventListener('click', cancelDeploy);

  $('token-input').addEventListener('input', () => {
    const t = $('token-input').value.trim();
    localStorage.setItem('gh_token', t);
    AI.setToken(t);
    updateDeployBtn();
    updateAIIndicator();
  });
  $('repo-name').addEventListener('input', updateDeployBtn);

  $('deploy-modal').addEventListener('click', e => {
    if (e.target === $('deploy-modal')) closeDeployModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDeployModal();
  });

  // Auto-fill GitHub token from URL hash
  if (window.location.hash.startsWith('#token=')) {
    const token = window.location.hash.slice(7);
    localStorage.setItem('gh_token', token);
    $('token-input').value = token;
    AI.setToken(token);
    history.replaceState(null, '', window.location.pathname);
    updateDeployBtn();
  }

  // Restore saved token or use embedded default
  const saved = localStorage.getItem('gh_token') || EMBEDDED_GH_TOKEN;
  $('token-input').value = saved;
  AI.setToken(saved);
  updateDeployBtn();
  updateAIIndicator();
  // If using embedded token, show a subtle indicator
  if (!localStorage.getItem('gh_token')) {
    $('token-info').textContent = '🔑 Встроенный токен — сайты создаются на @IlyaSigma111';
  }

  updateDeployBtn();
  updateAIIndicator();

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function updateAIIndicator() {
  const el = $('ai-indicator');
  if (AI.hasKey) {
    el.innerHTML = '✅ GitHub токен есть — контент создаёт <strong>GPT-4o-mini</strong>';
    el.style.color = '#4ade80';
  } else {
    el.innerHTML = 'ℹ️ Вставь GitHub токен — и контент будет генерировать реальный ИИ (GPT-4o-mini)';
    el.style.color = '#f59e0b';
  }
}

// ─── FILTERS ───
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTemplateGrid(btn.dataset.type);
    });
  });
}

function renderTemplateGrid(filter) {
  const grid = $('template-grid');
  grid.innerHTML = '';
  const items = filter === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.complex === filter);
  items.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tmpl-card reveal';
    card.onclick = () => selectTemplate(t.id);
    card.innerHTML = `
      <div class="tmpl-id">#${String(t.id).padStart(2,'0')}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <div class="tmpl-tags">
        <span class="tmpl-tag" style="background:${COMPLEX_COLORS[t.complex]}12;color:${COMPLEX_COLORS[t.complex]};border-color:${COMPLEX_COLORS[t.complex]}25">${COMPLEX_LABELS[t.complex]}</span>
        <span class="tmpl-tag tmpl-tag-time">⏱ 40 минут</span>
      </div>`;
    grid.appendChild(card);
  });
  setTimeout(() => {
    document.querySelectorAll('#template-grid .reveal').forEach(el => el.classList.add('visible'));
  }, 50);
}

function selectTemplate(id) {
  currentTemplate = TEMPLATES.find(t => t.id === id);
  document.querySelectorAll('.tmpl-card').forEach(c => c.classList.remove('selected'));
  const idx = TEMPLATES.indexOf(currentTemplate);
  const cards = document.querySelectorAll('.tmpl-card');
  if (cards[idx]) cards[idx].classList.add('selected');
  $('sel-tmpl-name').textContent = currentTemplate.name;
  $('sel-tmpl-name').style.display = 'inline';
  $('no-sel-tmpl').style.display = 'none';
  autoMatch();
}

// ─── AUTO MATCH ───
function autoMatch() {
  const desc = $('desc-input').value.trim();
  if (!desc) {
    $('gen-info').textContent = 'Напиши, какой сайт тебе нужен';
    return;
  }
  const matched = matchTemplate(desc);
  if (currentTemplate) {
    // Already selected
  } else {
    currentTemplate = matched;
    selectTemplate(matched.id);
  }
  const wc = desc.split(/\s+/).filter(Boolean).length;
  $('gen-info').textContent = `${wc} слов · ${AI.hasKey ? '🧠 GPT-4o-mini' : '📝 встроенный генератор'}`;
  $('generate-btn').disabled = false;
}

// ─── GENERATE ───
async function onGenerate() {
  const desc = $('desc-input').value.trim();
  if (!desc) { shake($('desc-input')); return; }
  if (!currentTemplate) { $('gen-info').textContent = '❌ Выбери шаблон'; return; }

  const accent = $('color-picker').value;
  const siteName = $('site-name').value.trim() || '';

  $('generate-btn').textContent = '⏳ Генерация...';
  $('generate-btn').disabled = true;
  $('preview-placeholder').style.display = 'none';
  usedRealAI = false;

  let content;

  if (AI.hasKey) {
    // Real AI via GitHub Models
    showAIStatus('🤖 GPT-4o-mini генерирует...', 5, true);
    try {
      content = await AI.generateContent(desc, currentTemplate, (status) => {
        showAIStatus(status.text, status.progress, status.progress < 100);
      });
      usedRealAI = true;
      showAIStatus('✅ Контент создан GPT-4o-mini!', 100, false);
      setTimeout(hideAIStatus, 2000);
    } catch (e) {
      console.warn('GitHub Models error:', e);
      showAIStatus('⚠️ Ошибка ИИ, использую запасной генератор', 0, false);
      setTimeout(hideAIStatus, 2500);
      content = generateSiteContent(desc, currentTemplate);
    }
  } else {
    // Template-based
    showAIStatus('📝 Встроенный генератор...', 30, true);
    await new Promise(r => setTimeout(r, 400));
    content = generateSiteContent(desc, currentTemplate);
    showAIStatus('✅ Готово', 100, false);
    setTimeout(hideAIStatus, 1500);
  }

  content.accent = accent;
  if (siteName) content.siteName = siteName;

  generatedCode = generateSite(currentTemplate, content);

  const blob = new Blob([generatedCode], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const frame = $('preview-frame');
  frame.src = url;
  frame.onload = () => { frame.style.display = 'block'; };

  $('generate-btn').textContent = '✅ Сайт готов!';
  $('gen-info').textContent = `${(generatedCode.length / 1024).toFixed(0)} KB · ${usedRealAI ? '🧠 GPT-4o-mini' : '📝 шаблон'} · можно деплоить ↓`;
  updateDeployBtn();
}

function showAIStatus(text, pct, showSpinner) {
  const el = $('ai-status');
  const label = $('ai-label');
  const pctEl = $('ai-pct');
  const prog = $('ai-progress');
  const fill = $('ai-progress-fill');

  el.style.display = 'flex';
  label.textContent = text;
  if (pct !== undefined) {
    pctEl.textContent = pct + '%';
    prog.style.display = 'block';
    fill.style.width = pct + '%';
  }
  if (showSpinner) el.classList.add('ai-loading');
  else el.classList.remove('ai-loading');
}

function hideAIStatus() {
  $('ai-status').style.display = 'none';
  $('ai-progress').style.display = 'none';
}

function shake(el) {
  el.style.borderColor = '#ef4444';
  el.style.animation = 'shake 0.4s';
  setTimeout(() => { el.style.borderColor = ''; el.style.animation = ''; }, 500);
}

function updateDeployBtn() {
  $('deploy-btn').disabled = !generatedCode || !$('token-input').value.trim();
}

// ─── DEPLOY ───
let deployAborted = false;

function cancelDeploy() {
  deployAborted = true;
  $('deploy-status').textContent += '\n⛔ Отменено.\n';
  $('deploy-progress').style.width = '0%';
  $('deploy-btn').disabled = false;
  $('deploy-cancel-btn').style.display = 'none';
  setTimeout(closeDeployModal, 1000);
}

async function onDeploy() {
  const token = $('token-input').value.trim();
  const repoName = $('repo-name').value.trim() || 'my-site-' + Date.now().toString(36);

  localStorage.setItem('gh_token', token);

  if (!token) { shake($('token-input')); return; }

  $('deploy-modal').classList.add('open');
  $('deploy-status').textContent = '';
  $('deploy-progress').style.width = '0%';
  $('deploy-result').style.display = 'none';
  $('deploy-cancel-btn').style.display = 'inline-flex';
  $('deploy-btn').disabled = true;
  deployAborted = false;

  const status = $('deploy-status');

  const steps = {
    'Авторизация': 10, 'авторизован': 20,
    'Проверка': 25, 'Создание репозитория': 35, 'создан': 40,
    'Заливка': 50, 'загружены': 70,
    'Включение': 75, 'включён': 85, 'уже': 85,
    'Готово': 95,
  };

  try {
    const result = await deployToGitHub(token, repoName, generatedCode, (msg) => {
      if (deployAborted) throw new Error('aborted');
      status.textContent += msg + '\n';
      status.scrollTop = status.scrollHeight;
      for (const [key, pct] of Object.entries(steps)) {
        if (msg.includes(key)) $('deploy-progress').style.width = pct + '%';
      }
    });
    $('deploy-progress').style.width = '100%';
    $('deploy-cancel-btn').style.display = 'none';
    $('deploy-result').style.display = 'block';
    $('deploy-result-link').href = result.url;
    $('deploy-result-link').textContent = result.url;
  } catch (e) {
    if (deployAborted) return;
    $('deploy-cancel-btn').style.display = 'none';
    status.textContent += '\n❌ ' + e.message + '\n';
    $('deploy-progress').style.width = '0%';
    $('deploy-btn').disabled = false;
  }
}

function closeDeployModal() {
  $('deploy-modal').classList.remove('open');
}

// ─── Shake animation ───
const style = document.createElement('style');
style.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', init);
