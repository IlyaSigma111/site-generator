class GitHubClient {
  constructor(token) {
    this.token = token;
    this.api = 'https://api.github.com';
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  }

  async _fetch(url, opts = {}) {
    const res = await fetch(url, { headers: this.headers, ...opts });
    const data = res.status === 204 ? null : await res.json();
    if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
    return data;
  }

  async getUser() {
    return this._fetch(`${this.api}/user`);
  }

  async repoExists(owner, name) {
    const res = await fetch(`${this.api}/repos/${owner}/${name}`, { headers: this.headers });
    return res.ok;
  }

  async createRepo(name, desc = '', priv = false) {
    return this._fetch(`${this.api}/user/repos`, {
      method: 'POST',
      body: JSON.stringify({
        name, description: desc, private: priv,
        auto_init: false, has_issues: false, has_wiki: false
      })
    });
  }

  async createOrUpdateFile(owner, repo, path, content, message) {
    return this._fetch(`${this.api}/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: btoa(unescape(encodeURIComponent(content)))
      })
    });
  }

  async enablePages(owner, repo) {
    return this._fetch(`${this.api}/repos/${owner}/${repo}/pages`, {
      method: 'POST',
      body: JSON.stringify({
        source: { branch: 'main', path: '/' }
      })
    });
  }

  async getPagesStatus(owner, repo) {
    return this._fetch(`${this.api}/repos/${owner}/${repo}/pages`);
  }
}

async function deployToGitHub(token, repoName, siteHtml, onLog) {
  const log = (msg) => { if (onLog) onLog(msg); };

  log('🔑 Авторизация в GitHub...');
  const gh = new GitHubClient(token);
  let user;
  try {
    user = await gh.getUser();
    log(`✅ Авторизован как ${user.login}`);
  } catch (e) {
    throw new Error(`Ошибка авторизации: ${e.message}. Проверь токен.`);
  }

  const name = repoName.toLowerCase().replace(/[^a-z0-9_-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'my-site';

  log(`📁 Проверка репозитория ${name}...`);
  const exists = await gh.repoExists(user.login, name);
  if (exists) {
    throw new Error(`Репозиторий "${name}" уже существует. Придумай другое имя.`);
  }

  log(`🚀 Создание репозитория ${name}...`);
  await gh.createRepo(name, 'Создано через Site Generator');
  log(`✅ Репозиторий создан`);

  log(`📄 Заливка файлов...`);
  await new Promise(r => setTimeout(r, 1000));
  await gh.createOrUpdateFile(user.login, name, 'index.html', siteHtml, 'Add index.html');
  await gh.createOrUpdateFile(user.login, name, '.nojekyll', '', 'Add .nojekyll');
  log(`✅ index.html + .nojekyll загружены`);

  log(`🌐 Включение GitHub Pages...`);
  try {
    await gh.enablePages(user.login, name);
    log(`✅ GitHub Pages включён`);
  } catch (e) {
    if (e.message && e.message.includes('already')) {
      log(`⚠️ Pages уже включён`);
    } else {
      throw e;
    }
  }

  const siteUrl = `https://${user.login}.github.io/${name}/`;
  log(`\n🎉 Готово! Сайт будет доступен через 1-2 минуты:`);
  log(`🔗 ${siteUrl}`);
  log(`📂 https://github.com/${user.login}/${name}`);

  return { url: siteUrl, repo: `${user.login}/${name}` };
}
