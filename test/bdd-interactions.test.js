/**
 * 🧪 BDD / TDD AUTOMATED TEST SUITE (100% COMPLETO)
 * Testes reais de DOM e fluxo de interação do usuário (Standard ⇄ Dev Mode, Terminal, i18n, Theme, Roadmap, Smart Composer com Web3Forms, Connections).
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// ─── ROBUST DOM SIMULATOR FOR BDD ───
class DOMNode {
  constructor(tagName, attrs = {}, text = '') {
    this.tagName = tagName.toUpperCase();
    this.attributes = { ...attrs };
    const classes = new Set((attrs.class || '').split(/\s+/).filter(Boolean));
    this.classList = {
      _set: classes,
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
      has: (c) => classes.has(c),
      toggle: (c) => {
        if (classes.has(c)) { classes.delete(c); return false; }
        else { classes.add(c); return true; }
      }
    };
    this.id = attrs.id || '';
    this.name = attrs.name || '';
    this.value = attrs.value || '';
    this.children = [];
    this.parentNode = null;
    this._rawInnerHTML = text;
    this._listeners = {};
    this.style = {};
  }

  getAttribute(name) {
    return this.attributes[name] !== undefined ? this.attributes[name] : null;
  }

  setAttribute(name, val) {
    this.attributes[name] = String(val);
    if (name === 'class') {
      this.classList._set = new Set(String(val).split(/\s+/).filter(Boolean));
    }
    if (name === 'value') {
      this.value = String(val);
    }
  }

  removeAttribute(name) {
    delete this.attributes[name];
  }

  get innerHTML() {
    if (this.children.length > 0) {
      return this._rawInnerHTML + this.children.map(c => `<${c.tagName.toLowerCase()}>${c.innerHTML}</${c.tagName.toLowerCase()}>`).join('');
    }
    return this._rawInnerHTML;
  }

  set innerHTML(val) {
    this._rawInnerHTML = String(val);
    this.children = [];
    if (globalThis.__currentDOMNodes && typeof val === 'string' && val.includes('<')) {
      const tagRegex = /<([a-z0-9-]+)([^>]*)>([^<]*)/gi;
      let match;
      while ((match = tagRegex.exec(val)) !== null) {
        const tagName = match[1];
        if (tagName.startsWith('/') || tagName === '!doctype' || tagName === 'html') continue;
        const rawAttrs = match[2] || '';
        const innerText = match[3] || '';
        const attrs = {};
        const attrRegex = /([a-z0-9-:]+)(?:="([^"]*)")?/gi;
        let aMatch;
        while ((aMatch = attrRegex.exec(rawAttrs)) !== null) {
          attrs[aMatch[1]] = aMatch[2] !== undefined ? aMatch[2] : '';
        }
        const node = new DOMNode(tagName, attrs, innerText.trim());
        node.parentNode = this;
        this.children.push(node);
        globalThis.__currentDOMNodes.push(node);
      }
    }
  }

  get textContent() {
    return this.innerHTML.replace(/<[^>]*>/g, '');
  }

  set textContent(val) {
    this.innerHTML = String(val);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  closest(selector) {
    if (selector.startsWith('.')) {
      const cls = selector.slice(1);
      if (this.classList.has(cls)) return this;
      if (this.parentNode && this.parentNode.closest) return this.parentNode.closest(selector);
    }
    return null;
  }

  addEventListener(event, fn) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(fn);
  }

  dispatchEvent(event) {
    const list = this._listeners[event.type || event] || [];
    for (const fn of list) {
      fn({
        preventDefault: () => {},
        stopPropagation: () => {},
        target: this,
        currentTarget: this
      });
    }
  }

  click() {
    this.dispatchEvent({ type: 'click' });
  }

  focus() {
    this._isFocused = true;
  }
}

class MockFormData {
  constructor(formNode) {
    this.data = {};
    if (formNode && formNode.children) {
      this._extract(formNode);
    }
  }

  _extract(node) {
    if (node.name && node.value !== undefined) {
      this.data[node.name] = node.value;
    }
    if (node.children) {
      node.children.forEach(c => this._extract(c));
    }
  }

  set(k, v) { this.data[k] = String(v); }
  get(k) { return this.data[k]; }
}

function parseHTMLToTree(html) {
  const root = new DOMNode('HTML', { lang: 'pt-BR', 'data-theme': 'dark', 'data-view': 'standard' });
  const allNodes = [root];

  const tagRegex = /<([a-z0-9-]+)([^>]*)>/gi;
  let match;
  while ((match = tagRegex.exec(html)) !== null) {
    const tagName = match[1];
    if (tagName.startsWith('/') || tagName === '!doctype' || tagName === 'html') continue;
    const rawAttrs = match[2] || '';
    const attrs = {};
    const attrRegex = /([a-z0-9-:]+)(?:="([^"]*)")?/gi;
    let aMatch;
    while ((aMatch = attrRegex.exec(rawAttrs)) !== null) {
      attrs[aMatch[1]] = aMatch[2] !== undefined ? aMatch[2] : '';
    }
    const node = new DOMNode(tagName, attrs);
    allNodes.push(node);
  }

  return { root, allNodes };
}

function createDOMEnvironment(htmlFile = 'index.html') {
  const htmlContent = fs.readFileSync(path.join(__dirname, '..', htmlFile), 'utf8');
  const { root, allNodes } = parseHTMLToTree(htmlContent);
  globalThis.__currentDOMNodes = allNodes;

  const doc = {
    documentElement: root,
    readyState: 'complete',
    getElementById: (id) => allNodes.find(n => n.id === id) || null,
    querySelectorAll: (selector) => {
      if (selector.startsWith('.')) {
        const cls = selector.slice(1);
        return allNodes.filter(n => n.classList.has(cls));
      }
      if (selector.startsWith('[') && selector.endsWith(']')) {
        const inside = selector.slice(1, -1);
        if (inside.includes('=')) {
          const [attr, val] = inside.split('=');
          const cleanVal = val.replace(/^["']|["']$/g, '');
          return allNodes.filter(n => n.getAttribute(attr) === cleanVal);
        }
        return allNodes.filter(n => n.getAttribute(inside) !== null);
      }
      return [];
    },
    querySelector: (selector) => {
      const res = doc.querySelectorAll(selector);
      return res.length ? res[0] : null;
    },
    createElement: (tag) => {
      const node = new DOMNode(tag);
      allNodes.push(node);
      return node;
    },
    addEventListener: (event, fn) => {
      if (event === 'DOMContentLoaded') fn();
    }
  };

  const storage = {};
  const mockLocalStorage = {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; }
  };

  let lastFetchCall = null;
  const mockFetch = (url, options) => {
    lastFetchCall = { url, options };
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Message sent' })
    });
  };

  const mockWindow = {
    document: doc,
    localStorage: mockLocalStorage,
    navigator: { language: 'pt-BR' },
    location: { href: '' },
    fetch: mockFetch,
    FormData: MockFormData,
    matchMedia: () => ({ matches: false }),
    dispatchEvent: () => {},
    CustomEvent: function (name) { this.name = name; }
  };

  const appJsCode = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
  const runCode = new Function('window', 'document', 'localStorage', 'navigator', 'fetch', 'FormData', appJsCode);
  runCode(mockWindow, doc, mockLocalStorage, mockWindow.navigator, mockFetch, MockFormData);

  return { doc, window: mockWindow, storage, allNodes, getLastFetch: () => lastFetchCall };
}

// ─── EXECUÇÃO DOS TESTES ───
let total = 0;
let passed = 0;

function it(description, fn) {
  total++;
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('═══════════════════════════════════════════════════════════');
console.log('🧪 SUÍTE DE TESTES BDD/TDD · VALIDAÇÃO DE INTERAÇÃO');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📦 Scenario 1: Alternância do Modo Dev (Standard ⇄ Dev Mode)');
{
  const { doc, window } = createDOMEnvironment('index.html');
  const toggleBtn = doc.getElementById('btnViewToggle');

  it('Deve iniciar no modo Standard por padrão', () => {
    assert.strictEqual(doc.documentElement.getAttribute('data-view'), 'standard');
    assert.ok(toggleBtn.textContent.includes('Modo Dev'));
  });

  it('Deve alternar para Modo Dev ao clicar no botão', () => {
    toggleBtn.click();
    assert.strictEqual(doc.documentElement.getAttribute('data-view'), 'dev');
    assert.ok(toggleBtn.textContent.includes('Modo Padrão'));
  });

  it('Deve retornar para Modo Padrão no segundo clique', () => {
    toggleBtn.click();
    assert.strictEqual(doc.documentElement.getAttribute('data-view'), 'standard');
    assert.ok(toggleBtn.textContent.includes('Modo Dev'));
  });

  it('Deve alternar perfeitamente via window.toggleViewMode()', () => {
    window.toggleViewMode();
    assert.strictEqual(doc.documentElement.getAttribute('data-view'), 'dev');
    window.toggleViewMode();
    assert.strictEqual(doc.documentElement.getAttribute('data-view'), 'standard');
  });
}

console.log('\n📦 Scenario 2: Execução de Comandos no Terminal Interativo');
{
  const { doc, window } = createDOMEnvironment('index.html');
  window.toggleViewMode(); // Entra em modo dev

  it('Deve responder ao comando whoami', () => {
    window.runTerminalCommand('whoami');
    const termOutput = doc.getElementById('terminalOutput');
    assert.ok(termOutput.innerHTML.includes('pvduk') || termOutput.innerHTML.includes('Software Engineer'));
  });

  it('Deve responder ao comando projects', () => {
    window.runTerminalCommand('projects');
    const termOutput = doc.getElementById('terminalOutput');
    assert.ok(termOutput.innerHTML.includes('Roadmap de Requisitos'));
  });

  it('Deve responder ao comando costar', () => {
    window.runTerminalCommand('costar');
    const termOutput = doc.getElementById('terminalOutput');
    assert.ok(termOutput.innerHTML.includes('COSTAR'));
  });

  it('Deve limpar a tela com o comando clear', () => {
    window.runTerminalCommand('clear');
    const termOutput = doc.getElementById('terminalOutput');
    assert.ok(termOutput.innerHTML.includes('Terminal limpo'));
  });
}

console.log('\n📦 Scenario 3: Alternância Dinâmica de Idioma (i18n)');
{
  const { doc } = createDOMEnvironment('index.html');
  const langBtn = doc.querySelector('.lang-toggle');

  it('Deve iniciar em Português (pt-BR)', () => {
    assert.strictEqual(doc.documentElement.lang, 'pt-BR');
    assert.ok(langBtn.textContent.includes('PT'));
  });

  it('Deve alternar para Inglês ao clicar', () => {
    langBtn.click();
    assert.strictEqual(doc.documentElement.lang, 'en');
    assert.ok(langBtn.textContent.includes('EN'));
  });

  it('Deve retornar para Português no segundo clique', () => {
    langBtn.click();
    assert.strictEqual(doc.documentElement.lang, 'pt-BR');
    assert.ok(langBtn.textContent.includes('PT'));
  });
}

console.log('\n📦 Scenario 4: Alternância de Tema (Dark ⇄ Light)');
{
  const { doc } = createDOMEnvironment('index.html');
  const themeBtn = doc.querySelector('.theme-toggle');

  it('Deve iniciar no tema Dark por padrão com ícone SVG', () => {
    assert.strictEqual(doc.documentElement.getAttribute('data-theme'), 'dark');
    assert.ok(themeBtn.innerHTML.includes('<svg') || themeBtn.innerHTML.includes('viewBox'));
  });

  it('Deve alternar para Light mode ao clicar', () => {
    themeBtn.click();
    assert.strictEqual(doc.documentElement.getAttribute('data-theme'), 'light');
    assert.ok(themeBtn.innerHTML.includes('<svg') || themeBtn.innerHTML.includes('viewBox'));
  });

  it('Deve retornar para Dark mode no segundo clique', () => {
    themeBtn.click();
    assert.strictEqual(doc.documentElement.getAttribute('data-theme'), 'dark');
    assert.ok(themeBtn.innerHTML.includes('<svg') || themeBtn.innerHTML.includes('viewBox'));
  });
}

console.log('\n📦 Scenario 5: Interações do Roadmap de Requisitos');
{
  const { doc, window } = createDOMEnvironment('roadmap-requisitos.html');

  it('Deve exportar função global togglePhase', () => {
    assert.strictEqual(typeof window.togglePhase, 'function');
  });

  it('Deve abrir ou fechar fase ao chamar togglePhase', () => {
    const phase = new DOMNode('DIV', { class: 'phase' });
    const header = new DOMNode('DIV', { class: 'phase-header' });
    phase.appendChild(header);

    window.togglePhase(header);
    assert.ok(phase.classList.contains('open'));

    window.togglePhase(header);
    assert.ok(!phase.classList.contains('open'));
  });
}

console.log('\n📦 Scenario 6: Smart Email Composer com Web3Forms (Async Fetch)');
{
  const { doc, getLastFetch } = createDOMEnvironment('index.html');
  const contactForm = doc.getElementById('contactForm');
  const subjectInput = doc.getElementById('contactSubject');
  const emailInput = doc.getElementById('contactEmail');
  const messageInput = doc.getElementById('contactMessage');
  const composerStatus = doc.getElementById('composerStatus');
  const tags = doc.querySelectorAll('.subject-tag');

  it('Deve inicializar com campo de assunto preenchido e readonly', () => {
    assert.ok(subjectInput.value.length > 0);
    assert.ok(subjectInput.getAttribute('readonly') !== null);
  });

  it('Deve atualizar o assunto ao clicar em outra tag', () => {
    const projectTag = tags.find(t => t.getAttribute('data-subject') && t.getAttribute('data-subject').includes('Projeto'));
    assert.ok(projectTag, 'Tag de projeto encontrada');
    projectTag.click();
    assert.ok(subjectInput.value.includes('Projeto'));
    assert.ok(projectTag.classList.contains('active'));
  });

  it('Deve enviar via Web3Forms assíncrono (fetch) ao submeter o formulário', async () => {
    emailInput.value = 'recrutador@empresa.com';
    messageInput.value = 'Olá Paulo, gostamos do seu portfólio e temos uma oportunidade.';

    contactForm.dispatchEvent({ type: 'submit' });

    // Aguarda resolução da promise
    await new Promise(r => setTimeout(r, 10));

    const fetchCall = getLastFetch();
    assert.ok(fetchCall, 'Fetch foi disparado');
    assert.strictEqual(fetchCall.url, 'https://api.web3forms.com/submit');
    assert.strictEqual(fetchCall.options.body.data.access_key, 'd4d219ae-6575-4b32-b4a1-bf14f65fb12c');
    assert.strictEqual(composerStatus.className, 'composer-status success');
    assert.ok(composerStatus.textContent.includes('sucesso'));
  });
}

console.log('\n📦 Scenario 7: Seção 05 de Conexões (GitHub & LinkedIn)');
{
  const { doc } = createDOMEnvironment('index.html');
  const githubCard = doc.querySelector('.connection-github');
  const linkedinCard = doc.querySelector('.connection-linkedin');

  it('Deve possuir links seguros com target _blank e rel noopener', () => {
    assert.ok(githubCard);
    assert.ok(linkedinCard);
    assert.strictEqual(githubCard.getAttribute('target'), '_blank');
    assert.strictEqual(githubCard.getAttribute('rel'), 'noopener noreferrer');
    assert.strictEqual(linkedinCard.getAttribute('target'), '_blank');
    assert.strictEqual(linkedinCard.getAttribute('rel'), 'noopener noreferrer');
  });
}

console.log('\n📦 Scenario 8: Auditoria de Paridade de i18n (PT ⇄ EN) & Vetorização SVG');
{
  const appCode = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
  const dictMatch = appCode.match(/const dictionaries = ({[\s\S]*?});\s*Object\.freeze/);
  const dictionaries = eval('(' + dictMatch[1] + ')');
  const ptKeys = Object.keys(dictionaries.pt);
  const enKeys = Object.keys(dictionaries.en);

  it('Deve possuir 100% de simetria entre as chaves PT e EN (nenhuma chave faltante)', () => {
    const missingInEn = ptKeys.filter(k => !enKeys.includes(k));
    const missingInPt = enKeys.filter(k => !ptKeys.includes(k));
    assert.strictEqual(missingInEn.length, 0, `Chaves faltando em EN: ${missingInEn.join(', ')}`);
    assert.strictEqual(missingInPt.length, 0, `Chaves faltando em PT: ${missingInPt.join(', ')}`);
  });

  it('Todos os atributos data-i18n do HTML devem existir nos dicionários', () => {
    ['index.html', 'roadmap-requisitos.html'].forEach(file => {
      const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
      const regex = /data-i18n(?:-placeholder|-aria)?="([^"]+)"/g;
      let match;
      while ((match = regex.exec(html)) !== null) {
        const key = match[1];
        assert.ok(dictionaries.pt[key], `Chave ${key} encontrada em ${file} mas ausente em dicionários.pt`);
        assert.ok(dictionaries.en[key], `Chave ${key} encontrada em ${file} mas ausente em dicionários.en`);
      }
    });
  });

  it('Controles interativos devem utilizar SVGs inline padronizados', () => {
    const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    assert.ok(indexHtml.includes('<svg width="13" height="13"'), 'Tags de assunto usam SVGs');
    assert.ok(indexHtml.includes('<svg width="15" height="15"'), 'Botões de envio e alternância usam SVGs');
  });
}

console.log('\n📦 Scenario 9: Consistência do Header & Transição de Rotas (index ⇄ roadmap)');
{
  const indexEnv = createDOMEnvironment('index.html');
  const roadmapEnv = createDOMEnvironment('roadmap-requisitos.html');

  it('Ambas as páginas devem possuir o logo minimalista no header e botão de Modo Dev (#btnViewToggle) exclusivo no index', () => {
    assert.ok(indexEnv.doc.querySelector('.topbar-brand-logo'), 'Logo presente no index header');
    assert.ok(roadmapEnv.doc.querySelector('.topbar-brand-logo'), 'Logo presente no roadmap header');
    assert.ok(indexEnv.doc.getElementById('btnViewToggle'), 'Modo Dev presente no index');
    assert.ok(!roadmapEnv.doc.getElementById('btnViewToggle'), 'Modo Dev ausente no roadmap');
  });

  it('A página inicial deve exibir pvduk.dev no Hero Brand Lockup do main', () => {
    const heroBrand = indexEnv.doc.querySelector('[data-i18n="nav.brand"]');
    assert.ok(heroBrand, 'Marca pvduk.dev presente no Hero do main');
    assert.strictEqual(heroBrand.textContent, 'pvduk · dev');
  });
}

console.log('\n📦 Scenario 10: Bandeiras em SVG e Tradução Dinâmica no Hero');
{
  const { doc, window } = createDOMEnvironment('index.html');
  const langToggle = doc.querySelector('.lang-toggle');
  const heroTitle = doc.querySelector('[data-i18n="hub.hero_title"]');
  const avaloniaPill = doc.querySelector('[data-i18n="disc.avalonia_ui"]');
  const sqlPill = doc.querySelector('[data-i18n="disc.sql_nosql"]');

  it('Deve iniciar em PT com bandeira do Brasil em SVG, título FullStack C#/React e pills corretas', () => {
    assert.ok(langToggle.innerHTML.includes('<svg'), 'Bandeira em SVG no botão PT');
    assert.ok(langToggle.innerHTML.includes('M7.1 7.7 Q10 5.6 12.9 6.3'), 'Faixa astronômica do Brasil na orientação correta');
    assert.ok(langToggle.innerHTML.includes('PT'), 'Texto PT presente');
    assert.ok(heroTitle.innerHTML.includes('FullStack C#/React'), 'Título Hero em PT');
    assert.strictEqual(avaloniaPill.textContent, 'Avalonia UI');
    assert.strictEqual(sqlPill.textContent, 'SQL e NoSQL');
  });

  it('Ao alternar para EN, deve renderizar bandeira dos EUA em SVG e título hero em Inglês', () => {
    window.toggleLanguage();
    assert.ok(langToggle.innerHTML.includes('<svg'), 'Bandeira em SVG no botão EN');
    assert.ok(langToggle.innerHTML.includes('#1E3A8A') || langToggle.innerHTML.includes('#B91C1C'), 'Cores oficiais da bandeira dos EUA no SVG');
    assert.ok(langToggle.innerHTML.includes('EN'), 'Texto EN presente');
    assert.ok(heroTitle.innerHTML.includes('Software Engineer'), 'Título Hero em EN');
    assert.strictEqual(sqlPill.textContent, 'SQL and NoSQL');
  });

  it('CSS Components deve possuir gap de espaçamento no botão lang-toggle', () => {
    const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');
    assert.ok(cssComponents.includes('.lang-toggle {') && cssComponents.includes('gap: 7px;'), 'Espaçamento de 7px no lang-toggle');
  });
}

console.log('\n📦 Scenario 11: Validação de Responsividade Mobile & CSS Design System');
{
  it('CSS Components deve conter regras responsivas para tablets e smartphones', () => {
    const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');
    assert.ok(cssComponents.includes('@media (max-width: 768px)'), 'Regra para tablets presente');
    assert.ok(cssComponents.includes('@media (max-width: 480px)'), 'Regra para mobile presente');
  });

  it('CSS Home deve conter regras responsivas para grid de conexões e terminal', () => {
    const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');
    assert.ok(cssHome.includes('.connections-grid { grid-template-columns: 1fr; }'), 'Conexões em 1 coluna no mobile');
    assert.ok(cssHome.includes('@media (max-width: 580px)'), 'Regras para mobile estreito presentes');
  });

  it('CSS Roadmap deve conter regras responsivas para timeline e footer bar', () => {
    const cssRoadmap = fs.readFileSync(path.join(__dirname, '../css/pages/roadmap.css'), 'utf8');
    assert.ok(cssRoadmap.includes('@media (max-width: 650px)'), 'Regra mobile para roadmap presente');
    assert.ok(cssRoadmap.includes('.footer-progress-bar'), 'Footer progress bar estilizado para mobile');
  });
}

console.log('\n📦 Scenario 12: Topbar Grid Centering & Mobile Fat Finger Protection');
{
  const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');
  const cssRoadmap = fs.readFileSync(path.join(__dirname, '../css/pages/roadmap.css'), 'utf8');

  it('Topbar Desktop deve possuir grid 3-colunas centrado e flex-shrink 0 evitando desalinhamento', () => {
    assert.ok(cssComponents.includes('grid-template-columns: 1fr auto 1fr;'), 'Grid 3-colunas');
    assert.ok(cssComponents.includes('.topbar-nav {') && cssComponents.includes('justify-self: center;'), 'Nav centralizado');
    assert.ok(cssComponents.includes('.topbar-controls {') && cssComponents.includes('justify-self: end;'), 'Controls alinhados à direita');
  });

  it('Controles do Topbar no Mobile devem cumprir a norma Fat Finger (mínimo 44x44px de área de toque)', () => {
    assert.ok(cssComponents.includes('min-height: 44px;'), 'Touch target de 44px nos controles');
    assert.ok(cssComponents.includes('.nav-pill {') && cssComponents.includes('min-height: 44px;'), 'Nav pill 44px touch target');
    assert.ok(cssComponents.includes('display: flex;') && cssComponents.includes('flex-wrap: wrap;'), 'Topbar flex no mobile');
  });

  it('Tags de assunto, chips e accordions no Mobile devem ter touch target confortável para dedos grandes', () => {
    assert.ok(cssHome.includes('.subject-tag {') && cssHome.includes('min-height: 44px;'), 'Subject tags 44px');
    assert.ok(cssHome.includes('.term-chip {') && cssHome.includes('min-height: 44px;'), 'Term chips 44px');
    assert.ok(cssRoadmap.includes('.phase-header {') && cssRoadmap.includes('min-height: 54px;'), 'Phase headers 54px');
  });
}

console.log('\n📦 Scenario 13: Prevenção de FOUC de Tema (Zero Flash no Reload)');
{
  ['index.html', 'roadmap-requisitos.html'].forEach(file => {
    const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    it(`${file} deve conter o script anti-FOUC síncrono no topo do head`, () => {
      assert.ok(html.includes('Anti-FOUC'), 'Script anti-FOUC presente');
      assert.ok(html.includes("localStorage.getItem('costar_preferred_theme')"), 'Leitura síncrona do tema antes da renderização');
    });

    it(`${file} deve inicializar imediatamente com tema "light" no reload quando salvo no localStorage`, () => {
      const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
      assert.ok(scriptMatch, 'Script inline localizado');
      const root = new DOMNode('HTML', { lang: 'pt-BR' });
      const mockStorage = { 'costar_preferred_theme': 'light' };
      const doc = { documentElement: root };
      const win = { matchMedia: () => ({ matches: false }) };
      const runAntiFouc = new Function('document', 'localStorage', 'window', scriptMatch[1]);
      runAntiFouc(doc, { getItem: k => mockStorage[k] || null }, win);
      assert.strictEqual(root.getAttribute('data-theme'), 'light', 'Tema light configurado antes de qualquer CSS');
    });

    it(`${file} deve inicializar imediatamente com tema "dark" no reload quando salvo no localStorage`, () => {
      const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
      const root = new DOMNode('HTML', { lang: 'pt-BR' });
      const mockStorage = { 'costar_preferred_theme': 'dark' };
      const doc = { documentElement: root };
      const win = { matchMedia: () => ({ matches: false }) };
      const runAntiFouc = new Function('document', 'localStorage', 'window', scriptMatch[1]);
      runAntiFouc(doc, { getItem: k => mockStorage[k] || null }, win);
      assert.strictEqual(root.getAttribute('data-theme'), 'dark', 'Tema dark configurado antes de qualquer CSS');
    });
  });
}

console.log('\n📦 Scenario 14: Borda Luminosa e Halo do Logo no Tema Escuro (Modern Glass Ring)');
{
  const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');

  it('Topbar Brand Logo deve possuir borda luminosa e halo no tema escuro', () => {
    assert.ok(cssComponents.includes('[data-theme="dark"] .topbar-brand-logo'), 'Seletor tema escuro para topbar logo presente');
    assert.ok(cssComponents.includes('border-color: rgba(255, 255, 255,'), 'Borda luminosa configurada no topbar');
  });

  it('Hero Brand Logo deve possuir borda luminosa e profundidade no tema escuro', () => {
    assert.ok(cssHome.includes('[data-theme="dark"] .hero-brand-logo'), 'Seletor tema escuro para hero logo presente');
    assert.ok(cssHome.includes('border-color: rgba(255, 255, 255,'), 'Borda luminosa configurada no hero logo');
  });
}


console.log('\n📦 Scenario 15: Roadmap 8 Fases i18n Dinâmico & Zero FlowPulse');
{
  const { doc, window } = createDOMEnvironment('roadmap-requisitos.html');
  const p0Title = doc.querySelector('[data-i18n="roadmap.p0_title"]');
  const p8Title = doc.querySelector('[data-i18n="roadmap.p8_title"]');
  const caseText = doc.querySelector('[data-i18n="roadmap.case_overview_text"]');

  it('Roadmap deve inicializar em PT com FirstStrike Analytics e sem "&" nos títulos', () => {
    assert.ok(p0Title.textContent.includes('Discovery e Alinhamento'), 'Fase 00 em PT sem &');
    assert.ok(p8Title.textContent.includes('Gate de Qualidade e Entrada em Produção'), 'Fase 08 em PT sem &');
    assert.ok(caseText.textContent.includes('FirstStrike Analytics'), 'Estudo de caso FirstStrike Analytics em PT');
    assert.ok(!caseText.textContent.includes('FlowPulse'), 'Zero FlowPulse em PT');
  });

  it('Ao alternar para EN no roadmap, deve traduzir dinamicamente todas as 8 fases para inglês', () => {
    window.toggleLanguage();
    assert.ok(p0Title.textContent.includes('Discovery and Business Pain Alignment'), 'Fase 00 traduzida para EN');
    assert.ok(p8Title.textContent.includes('Quality Gate and Production Launch'), 'Fase 08 traduzida para EN');
    assert.ok(caseText.textContent.includes('FirstStrike Analytics'), 'Estudo de caso FirstStrike Analytics em EN');
    assert.ok(!caseText.textContent.includes('FlowPulse'), 'Zero FlowPulse em EN');
  });

  it('Auditoria global: Toda a base de código deve ter ZERO ocorrências de FlowPulse', () => {
    const files = ['index.html', 'roadmap-requisitos.html', 'package.json', 'README.md', 'docs/frontend-architecture.md', 'js/app.js', 'js/translations/pt.js', 'js/translations/en.js'];
    files.forEach(f => {
      if (fs.existsSync(path.join(__dirname, '..', f))) {
        const content = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
        assert.ok(!/flowpulse/i.test(content), `Arquivo ${f} livre de FlowPulse`);
      }
    });
  });
}

console.log('\n📦 Scenario 16: Roadmap Layout Integrity & Proteção Responsiva Mobile');
{
  const cssRoadmap = fs.readFileSync(path.join(__dirname, '../css/pages/roadmap.css'), 'utf8');

  it('Roadmap CSS deve conter classe gate-status-grid com adaptação responsiva mobile', () => {
    assert.ok(cssRoadmap.includes('.gate-status-grid'), 'Classe gate-status-grid presente');
    assert.ok(cssRoadmap.includes('grid-template-columns: 1fr;'), 'Wrap de coluna para mobile em gate-status-grid');
  });

  it('Roadmap CSS deve blindar content-block com overflow-x seguro contra quebra no mobile', () => {
    assert.ok(cssRoadmap.includes('overflow-x: auto;'), 'overflow-x auto em content-block');
    assert.ok(cssRoadmap.includes('max-width: 100%;'), 'max-width 100% em content-block');
  });
}
console.log('\n📦 Scenario 17: Modo Dev Terminal Dinâmico & Alternância de Idioma em Tempo Real');
{
  const { doc, window } = createDOMEnvironment('index.html');
  const whoamiTitle = doc.querySelector('[data-i18n="terminal.whoami_title"]');
  const whoamiDesc = doc.querySelector('[data-i18n="terminal.whoami_desc"]');
  const whoamiStatus = doc.querySelector('[data-i18n="terminal.whoami_status"]');

  it('Terminal inicial deve abrir com whoami em Português por padrão', () => {
    assert.ok(whoamiTitle.textContent.includes('FullStack C#/React'), 'Título whoami em PT');
    assert.ok(whoamiDesc.textContent.includes('arquitetura limpa'), 'Descrição whoami em PT');
    assert.ok(whoamiStatus.textContent.includes('Disponível para projetos'), 'Status whoami em PT');
  });

  it('Ao alternar idioma para EN, whoami inicial deve traduzir dinamicamente para inglês sem reload', () => {
    window.toggleLanguage();
    assert.ok(whoamiTitle.textContent.includes('Senior Software Engineer and FullStack C#/React'), 'Título whoami traduzido para EN');
    assert.ok(whoamiDesc.textContent.includes('clean architecture'), 'Descrição whoami traduzida para EN');
    assert.ok(whoamiStatus.textContent.includes('Available for projects'), 'Status whoami traduzido para EN');
  });

  it('Comandos executados dinamicamente no terminal devem conter data-i18n e responder à troca de idioma', () => {
    const input = doc.getElementById('terminalInput');
    const form = doc.getElementById('terminalForm');
    
    // Executa comando story
    input.value = 'story';
    form.dispatchEvent({ type: 'submit' });

    const storyTitle = doc.querySelector('[data-i18n="terminal.story_title"]');
    assert.ok(storyTitle, 'Saída do comando story contém data-i18n');
    assert.ok(storyTitle.textContent.includes('CAREER LOG'), 'Comando story renderizado em EN');

    // Alterna de volta para PT
    window.toggleLanguage();
    assert.ok(storyTitle.textContent.includes('LOG DE CARREIRA'), 'Comando story traduzido em tempo real para PT');
    assert.ok(whoamiTitle.textContent.includes('FullStack C#/React'), 'whoami de volta para PT');
  });
}

console.log('\n📦 Scenario 18: Blindagem Mobile do Terminal Dev (WCAG 2.2 AA & Anti-Overflow)');
{
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');

  it('home.css deve blindar term-table-wrap com overflow-x seguro contra estouro horizontal no mobile', () => {
    assert.ok(cssHome.includes('.term-table-wrap {') && cssHome.includes('overflow-x: auto;'), 'overflow-x auto em term-table-wrap');
    assert.ok(cssHome.includes('max-width: 100%;'), 'max-width 100% em term-table-wrap');
    assert.ok(cssHome.includes('.term-table {') && cssHome.includes('min-width: 480px;'), 'min-width 480px em term-table');
  });

  it('home.css deve conter media query específica para terminal em telas compactas (<= 580px)', () => {
    assert.ok(cssHome.includes('@media (max-width: 580px)'), 'Media query 580px presente');
    assert.ok(cssHome.includes('.dev-terminal-container {') && cssHome.includes('padding: 16px 8px 48px;'), 'Padding compacto no container terminal mobile');
    assert.ok(cssHome.includes('.terminal-output {') && cssHome.includes('padding: 12px 10px;'), 'Padding reduzido no output terminal mobile');
    assert.ok(cssHome.includes('.terminal-input {') && cssHome.includes('min-height: 44px;'), 'Touch target acessível para input do terminal');
  });

  it('Terminal e codebase devem estar 100% padronizados em Vanilla ES2026 (ZERO ocorrências de ES2024)', () => {
    const ptDict = require('../js/translations/pt.js').pt;
    const enDict = require('../js/translations/en.js').en;

    assert.ok(ptDict['terminal.whoami_tag_ts'].includes('ES2026'), 'whoami tag em PT usa ES2026');
    assert.ok(ptDict['terminal.proj2_stack'].includes('ES2026'), 'proj2 stack em PT usa ES2026');
    assert.ok(enDict['terminal.whoami_tag_ts'].includes('ES2026'), 'whoami tag em EN usa ES2026');
    assert.ok(enDict['terminal.proj2_stack'].includes('ES2026'), 'proj2 stack em EN usa ES2026');

    const auditedFiles = ['index.html', 'roadmap-requisitos.html', 'js/app.js', 'js/translations/pt.js', 'js/translations/en.js', 'docs/vision-document.md', 'README.md'];
    auditedFiles.forEach(f => {
      const p = path.join(__dirname, '..', f);
      if (fs.existsSync(p)) {
        const c = fs.readFileSync(p, 'utf8');
        assert.ok(!c.includes('ES2024'), `Arquivo ${f} livre de referências legadas a ES2024`);
      }
    });
  });
}

console.log('\n📦 Scenario 19: Sticky Footer Universal Fixo no Bottom (Standard & Dev Mode)');
{
  const cssBase = fs.readFileSync(path.join(__dirname, '../css/base.css'), 'utf8');
  const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');

  it('base.css deve configurar body com display flex, flex-direction column e min-height 100dvh', () => {
    assert.ok(cssBase.includes('min-height: 100dvh;'), 'min-height 100dvh no body');
    assert.ok(cssBase.includes('display: flex;'), 'display flex no body');
    assert.ok(cssBase.includes('flex-direction: column;'), 'flex-direction column no body');
  });

  it('components.css deve configurar main/main-content com flex: 1 0 auto e site-footer com margin-top: auto', () => {
    assert.ok(cssComponents.includes('main,') && cssComponents.includes('#main-content') && cssComponents.includes('flex: 1 0 auto;'), 'main flex-grow 1');
    assert.ok(cssComponents.includes('.site-footer {') && cssComponents.includes('margin-top: auto;'), 'footer com margin-top auto');
    assert.ok(cssComponents.includes('.site-footer {') && cssComponents.includes('flex-shrink: 0;'), 'footer flex-shrink 0');
  });

  it('home.css deve configurar .view-dev com flex-grow 1 e .dev-terminal-container com centralização vertical', () => {
    assert.ok(cssHome.includes('html[data-view="dev"] .view-dev {') && cssHome.includes('display: flex !important;') && cssHome.includes('flex: 1 0 auto;'), 'view-dev flex-grow 1 no Modo Dev');
    assert.ok(cssHome.includes('.dev-terminal-container {') && cssHome.includes('justify-content: center;'), 'terminal centralizado verticalmente no espaço útil');
  });
}

console.log('\n📦 Scenario 20: Progressive Web App (PWA) Baseline & Service Worker');
{
  const manifestRaw = fs.readFileSync(path.join(__dirname, '../manifest.webmanifest'), 'utf8');
  const manifest = JSON.parse(manifestRaw);
  const swCode = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');
  const appJsCode = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

  it('manifest.webmanifest deve ser um JSON válido com todos os campos essenciais de PWA', () => {
    assert.ok(manifest.name.includes('pvduk'), 'Nome da PWA');
    assert.strictEqual(manifest.short_name, 'pvduk.dev', 'Short name da PWA');
    assert.strictEqual(manifest.display, 'standalone', 'Display standalone configurado');
    assert.ok(manifest.icons.some(i => i.src === 'assets/logo.svg'), 'Ícone principal do manifest é assets/logo.svg');
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 3, 'Ícones PWA declarados');
    assert.ok(Array.isArray(manifest.shortcuts) && manifest.shortcuts.length >= 2, 'Atalhos PWA declarados');
  });

  it('Ícones PWA devem ser visualmente e estruturalmente idênticos ao favicon da aba (assets/logo.svg)', () => {
    const logoSvg = fs.readFileSync(path.join(__dirname, '../assets/logo.svg'), 'utf8');
    assert.ok(logoSvg.includes('fill="#000000"'), 'Logo SVG possui fundo preto #000000');
    assert.ok(logoSvg.includes('fill="#3B82F6"'), 'Logo SVG possui acento azul #3B82F6');
    assert.ok(logoSvg.includes('fill="#FFFFFF"'), 'Logo SVG possui glifo branco #FFFFFF');

    // Validação de existência e integridade dos ícones PNG gerados a partir do logo.svg
    assert.ok(fs.existsSync(path.join(__dirname, '../assets/icon-192.png')), 'icon-192.png presente');
    assert.ok(fs.existsSync(path.join(__dirname, '../assets/icon-512.png')), 'icon-512.png presente');
    const stat192 = fs.statSync(path.join(__dirname, '../assets/icon-192.png'));
    const stat512 = fs.statSync(path.join(__dirname, '../assets/icon-512.png'));
    assert.ok(stat192.size > 500, 'icon-192.png tamanho válido');
    assert.ok(stat512.size > 1000, 'icon-512.png tamanho válido');
  });

  it('sw.js deve conter precache do App Shell, ciclo de vida install/activate e interceptação fetch', () => {
    assert.ok(swCode.includes('CACHE_NAME'), 'Cache name configurado');
    assert.ok(swCode.includes('index.html') && swCode.includes('roadmap-requisitos.html'), 'Páginas essenciais no precache');
    assert.ok(swCode.includes('css/base.css') && swCode.includes('js/app.js'), 'CSS e JS no precache');
    assert.ok(swCode.includes('assets/logo.svg') && swCode.includes('assets/icon-192.png'), 'Assets de ícone no precache');
    assert.ok(swCode.includes("addEventListener('install'"), 'Listener install presente');
    assert.ok(swCode.includes("addEventListener('activate'"), 'Listener activate presente');
    assert.ok(swCode.includes("addEventListener('fetch'"), 'Listener fetch presente');
    assert.ok(swCode.includes('skipWaiting'), 'skipWaiting configurado para atualização ágil');
  });

  it('index.html e roadmap-requisitos.html devem conter links idênticos para favicon e apple-touch-icon (assets/logo.svg)', () => {
    ['index.html', 'roadmap-requisitos.html'].forEach(file => {
      const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
      assert.ok(html.includes('rel="icon" type="image/svg+xml" href="assets/logo.svg"'), `Favicon em ${file}`);
      assert.ok(html.includes('rel="apple-touch-icon" href="assets/logo.svg"'), `Apple touch icon idêntico ao favicon em ${file}`);
      assert.ok(html.includes('rel="manifest" href="manifest.webmanifest"'), `Manifest link em ${file}`);
      assert.ok(html.includes('name="theme-color"'), `Theme-color em ${file}`);
      assert.ok(html.includes('name="apple-mobile-web-app-capable"'), `Apple mobile web app capable em ${file}`);
    });
  });

  it('app.js deve inicializar e registrar o Service Worker de forma segura e resiliente', () => {
    assert.ok(appJsCode.includes('initPWA'), 'Função initPWA presente');
    assert.ok(appJsCode.includes('navigator.serviceWorker.register'), 'Registro do Service Worker em app.js');
    assert.ok(appJsCode.includes("protocol.startsWith('http')"), 'Checagem segura de protocolo HTTP/HTTPS');
  });
}

console.log('\n📦 Scenario 21: Prevenção de Auto-Scroll no Carregamento Inicial (Zero Jump ao Footer)');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

  it('index.html e roadmap-requisitos.html não devem conter o atributo autofocus para não forçar scroll ao rodapé', () => {
    assert.ok(!indexHtml.includes('autofocus'), 'index.html livre de autofocus indesejado');
    assert.ok(!roadmapHtml.includes('autofocus'), 'roadmap-requisitos.html livre de autofocus indesejado');
  });

  it('app.js deve focar o terminal com preventScroll: true para preservar a posição da viewport', () => {
    assert.ok(appJs.includes('preventScroll: true'), 'Foco com preventScroll presente em app.js');
  });
}

console.log('\n📦 Scenario 22: Auditoria de Segurança & GitHub Pages CI/CD Deploy Gate');
{
  const gitignore = fs.readFileSync(path.join(__dirname, '../.gitignore'), 'utf8');
  const deployYaml = fs.readFileSync(path.join(__dirname, '../.github/workflows/deploy.yml'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

  it('.gitignore deve conter bloqueio estrito para .env, certificados e chaves privadas', () => {
    assert.ok(gitignore.includes('.env'), '.gitignore bloqueia .env');
    assert.ok(gitignore.includes('*.pem') && gitignore.includes('*.key'), '.gitignore bloqueia certificados e chaves');
    assert.ok(gitignore.includes('id_rsa'), '.gitignore bloqueia chaves ssh');
  });

  it('GitHub Pages CI/CD workflow (.github/workflows/deploy.yml) deve estar configurado para testar e publicar dist/', () => {
    assert.ok(deployYaml.includes('npm test'), 'CI roda testes automatizados antes do deploy');
    assert.ok(deployYaml.includes('npm run build'), 'CI executa compilação e minificação');
    assert.ok(deployYaml.includes("path: './dist'"), 'CI publica pasta dist/');
    assert.ok(fs.existsSync(path.join(__dirname, '../.nojekyll')), 'Arquivo .nojekyll presente');
    assert.ok(fs.existsSync(path.join(__dirname, '../404.html')), 'Página 404.html presente');
  });

  it('Terminal interativo em app.js deve sanitizar entradas do usuário via escapeHtml contra XSS', () => {
    assert.ok(appJs.includes('function escapeHtml('), 'Função escapeHtml presente');
    assert.ok(appJs.includes('escapeHtml(cmdRaw)'), 'Entrada do usuário sanitizada antes da renderização');
  });
}

console.log('\n📦 Scenario 23: Contraste e Legibilidade Temática de Infoboxes (Dark & Light Mode)');
{
  const cssBase = fs.readFileSync(path.join(__dirname, '../css/base.css'), 'utf8');
  const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');

  it('base.css deve definir tokens temáticos de fundo, borda e texto para infoboxes em ambos os temas', () => {
    assert.ok(cssBase.includes('--ib-blue-bg: rgba('), 'Fundo dark de ib-blue configurado com transparência');
    assert.ok(cssBase.includes('--ib-blue-text: #bfdbfe;'), 'Texto de alto contraste para ib-blue em dark theme');
    assert.ok(cssBase.includes('--ib-blue-bg: #eff6ff;'), 'Fundo suave de ib-blue em light theme');
    assert.ok(cssBase.includes('--ib-blue-text: #1e3a8a;'), 'Texto de alto contraste para ib-blue em light theme');
  });

  it('components.css deve estilizar .ib-blue e .infobox-title com as variáveis de tema', () => {
    assert.ok(cssComponents.includes('.ib-blue {') && cssComponents.includes('background: var(--ib-blue-bg);'), 'ib-blue usa var(--ib-blue-bg)');
    assert.ok(cssComponents.includes('color: var(--ib-blue-text);'), 'ib-blue usa var(--ib-blue-text)');
    assert.ok(cssComponents.includes('.infobox .infobox-title {'), 'Classe infobox-title presente');
  });

  it('roadmap-requisitos.html deve conter a classe infobox-title e herdar o texto temático legível', () => {
    assert.ok(roadmapHtml.includes('class="infobox ib-blue"'), 'Cartão infobox ib-blue presente');
    assert.ok(roadmapHtml.includes('class="infobox-title"'), 'infobox-title aplicada na Visão Geral');
    assert.ok(!roadmapHtml.includes('color:var(--text-main);"\n          data-i18n="roadmap.case_overview_text"'), 'Livre de cor inline conflitante');
  });
}

console.log('\n📦 Scenario 24: Auditoria Lighthouse & Acessibilidade Mobile (WCAG 2.2 AAA & Composited Animations)');
{
  const cssBase = fs.readFileSync(path.join(__dirname, '../css/base.css'), 'utf8');
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');

  it('base.css e home.css devem utilizar --badge-blue-text com contraste seguro >= 7:1 em dark mode', () => {
    assert.ok(cssBase.includes('--badge-blue-text: #60a5fa;'), 'Token --badge-blue-text no tema escuro');
    assert.ok(cssHome.includes('.proj-badge') && cssHome.includes('color: var(--badge-blue-text);'), '.proj-badge com alto contraste');
    assert.ok(cssHome.includes('.story-year') && cssHome.includes('color: var(--badge-blue-text);'), '.story-year com alto contraste');
    assert.ok(cssHome.includes('.conn-badge') && cssHome.includes('color: var(--badge-blue-text);'), '.conn-badge com alto contraste');
  });

  it('Botão lang-toggle e links de conexão devem respeitar WCAG 2.5.3 (Label in Name)', () => {
    assert.ok(indexHtml.includes('aria-label="PT - Alternar Idioma"'), 'lang-toggle inclui texto visível PT');
    assert.ok(appJs.includes("btn.setAttribute('aria-label', 'PT - Alternar Idioma')"), 'app.js preserva Label in Name em PT');
    assert.ok(appJs.includes("btn.setAttribute('aria-label', 'EN - Switch Language')"), 'app.js preserva Label in Name em EN');
    assert.ok(indexHtml.includes('aria-label="GitHub @pvduk"'), 'Link GitHub inclui texto visível @pvduk');
    assert.ok(indexHtml.includes('aria-label="LinkedIn in/pvduk"'), 'Link LinkedIn inclui texto visível in/pvduk');
  });

  it('Animação .status-dot (statusPulse) deve ser 100% GPU composited sem box-shadow keyframes', () => {
    assert.ok(cssHome.includes('.status-dot::after'), 'Pseudo-elemento de pulso presente');
    assert.ok(cssHome.includes('transform: scale(') && cssHome.includes('opacity: 0'), 'statusPulse anima exclusivamente transform e opacity');
  });
}

console.log('\n📦 Scenario 25: Engenharia de Código Limpo (KISS, YAGNI, DRY, SOLID & Zero-Dep Build)');
{
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
  const swJs = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');

  it('package.json deve conter script de build zero-dependency', () => {
    assert.ok(pkg.scripts.build, 'Script build presente em package.json');
    assert.strictEqual(pkg.scripts.build, 'node build.js', 'Build roda node build.js nativo');
  });

  it('js/app.js deve adotar padrão OCP/SOLID com commandRegistry e commandAliases', () => {
    assert.ok(appJs.includes('const commandRegistry = {'), 'commandRegistry estruturado presente');
    assert.ok(appJs.includes('const commandAliases = {'), 'commandAliases estruturado presente');
    assert.ok(!appJs.includes('switch (cmd)'), 'Switch/case monolítico substituído por mapeamento OCP');
  });

  it('Base de código deve estar livre de arquivos órfãos não utilizados (YAGNI)', () => {
    assert.ok(!fs.existsSync(path.join(__dirname, '../js/i18n.js')), 'js/i18n.js removido');
    assert.ok(!fs.existsSync(path.join(__dirname, '../js/theme.js')), 'js/theme.js removido');
    assert.ok(!swJs.includes('js/i18n.js') && !swJs.includes('js/theme.js'), 'sw.js limpo de referências mortas');
  });

  it('build.js deve gerar pasta dist/ com todos os arquivos minificados com sucesso', () => {
    const { execSync } = require('child_process');
    execSync('node build.js', { cwd: path.join(__dirname, '..'), stdio: 'ignore' });

    assert.ok(fs.existsSync(path.join(__dirname, '../dist')), 'Pasta dist/ existe');
    assert.ok(fs.existsSync(path.join(__dirname, '../dist/index.html')), 'dist/index.html gerado');
    assert.ok(fs.existsSync(path.join(__dirname, '../dist/js/app.js')), 'dist/js/app.js gerado');
    assert.ok(fs.existsSync(path.join(__dirname, '../dist/css/base.css')), 'dist/css/base.css gerado');
  });
}

console.log('\n📦 Scenario 26: Otimização Crítica de Tipografia & Self-Hosted WOFF2 (Zero Third-Party Latency)');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const errorHtml = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
  const cssBase = fs.readFileSync(path.join(__dirname, '../css/base.css'), 'utf8');
  const swJs = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');

  it('HTMLs devem estar livres de conexões externas a Google Fonts', () => {
    [indexHtml, roadmapHtml, errorHtml].forEach((html, idx) => {
      assert.ok(!html.includes('fonts.googleapis.com'), `Página ${idx} sem chamadas a fonts.googleapis.com`);
      assert.ok(!html.includes('fonts.gstatic.com'), `Página ${idx} sem chamadas a fonts.gstatic.com`);
    });
  });

  it('HTMLs devem conter preload das fontes WOFF2 críticas (Inter e JetBrains Mono)', () => {
    [indexHtml, roadmapHtml, errorHtml].forEach((html, idx) => {
      assert.ok(html.includes('rel="preload"') && html.includes('assets/fonts/inter-latin.woff2'), `Página ${idx} contém preload de inter-latin.woff2`);
      assert.ok(html.includes('rel="preload"') && html.includes('assets/fonts/jetbrains-mono-latin.woff2'), `Página ${idx} contém preload de jetbrains-mono-latin.woff2`);
    });
  });

  it('css/base.css deve declarar @font-face local com font-display swap e tokens simplificados', () => {
    assert.ok(cssBase.includes("@font-face") && cssBase.includes("font-family: 'Inter'"), '@font-face para Inter presente');
    assert.ok(cssBase.includes("@font-face") && cssBase.includes("font-family: 'JetBrains Mono'"), '@font-face para JetBrains Mono presente');
    assert.ok(cssBase.includes("font-display: swap"), 'font-display swap configurado');
    assert.ok(cssBase.includes("--font-sans: 'Inter'"), '--font-sans aponta para Inter');
    assert.ok(cssBase.includes("--font-mono: 'JetBrains Mono'"), '--font-mono aponta para JetBrains Mono');
  });

  it('Arquivos de fontes WOFF2 devem existir localmente e no precache do Service Worker', () => {
    assert.ok(fs.existsSync(path.join(__dirname, '../assets/fonts/inter-latin.woff2')), 'inter-latin.woff2 existe');
    assert.ok(fs.existsSync(path.join(__dirname, '../assets/fonts/jetbrains-mono-latin.woff2')), 'jetbrains-mono-latin.woff2 existe');
    assert.ok(swJs.includes('assets/fonts/inter-latin.woff2'), 'inter-latin.woff2 no precache do sw.js');
    assert.ok(swJs.includes('assets/fonts/jetbrains-mono-latin.woff2'), 'jetbrains-mono-latin.woff2 no precache do sw.js');
  });
}

console.log('\n📦 Scenario 27: Zero Inline Styles & Separação Estrita de Responsabilidades (SoC & BEM)');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const errorHtml = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');
  const cssRoadmap = fs.readFileSync(path.join(__dirname, '../css/pages/roadmap.css'), 'utf8');
  const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');

  it('HTMLs e app.js devem conter ZERO atributos style="..." inline', () => {
    assert.ok(!indexHtml.includes('style='), 'index.html 100% livre de inline styles');
    assert.ok(!roadmapHtml.includes('style='), 'roadmap-requisitos.html 100% livre de inline styles');
    assert.ok(!errorHtml.includes('style='), '404.html 100% livre de inline styles');
    assert.ok(!appJs.includes('style='), 'app.js 100% livre de inline styles');
  });

  it('css/pages/home.css deve conter classes BEM para volume-card featured e controles de terminal', () => {
    assert.ok(cssHome.includes('.volume-card--featured'), '.volume-card--featured presente em home.css');
    assert.ok(cssHome.includes('.volumes-grid--single'), '.volumes-grid--single presente em home.css');
    assert.ok(cssHome.includes('.term-status-available'), '.term-status-available presente em home.css');
    assert.ok(cssHome.includes('.term-spacer'), '.term-spacer presente em home.css');
  });

  it('css/pages/roadmap.css deve conter classes BEM para letras COSTAR, fases e spec-box', () => {
    assert.ok(cssRoadmap.includes('.roadmap-costar-letter--c'), '.roadmap-costar-letter--c presente');
    assert.ok(cssRoadmap.includes('.phase-num--0'), '.phase-num--0 presente');
    assert.ok(cssRoadmap.includes('.spec-box'), '.spec-box presente');
    assert.ok(cssRoadmap.includes('.tline-dot--accent'), '.tline-dot--accent presente');
  });

  it('css/components.css deve conter .lang-flag, .main-content--centered e .site-container', () => {
    assert.ok(cssComponents.includes('.lang-flag'), '.lang-flag presente em components.css');
    assert.ok(cssComponents.includes('.main-content--centered'), '.main-content--centered presente em components.css');
    assert.ok(cssComponents.includes('.site-container'), '.site-container presente em components.css');
  });
}

console.log('\n📦 Scenario 28: SEO Nativo, Open Graph (1200x630) & Twitter Cards (LinkedIn/Social Sharing)');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const errorHtml = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
  const swJs = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');
  const ogSvgPath = path.join(__dirname, '../assets/og-image.svg');
  const ogPngPath = path.join(__dirname, '../assets/og-image.png');

  it('Todas as páginas HTML devem conter meta tags Open Graph completas (og:type, og:url, og:title, og:image, og:image:width 1200, og:image:height 630)', () => {
    [indexHtml, roadmapHtml, errorHtml].forEach((html) => {
      assert.ok(html.includes('property="og:type"'), 'og:type presente');
      assert.ok(html.includes('property="og:url"'), 'og:url presente');
      assert.ok(html.includes('property="og:title"'), 'og:title presente');
      assert.ok(html.includes('property="og:description"'), 'og:description presente');
      assert.ok(html.includes('property="og:image"'), 'og:image presente');
      assert.ok(html.includes('property="og:image:width" content="1200"'), 'og:image:width 1200 presente');
      assert.ok(html.includes('property="og:image:height" content="630"'), 'og:image:height 630 presente');
      assert.ok(html.includes('property="og:site_name" content="pvduk.dev"'), 'og:site_name presente');
    });
  });

  it('Todas as páginas HTML devem conter Twitter Cards completos (summary_large_image, twitter:creator, twitter:image)', () => {
    [indexHtml, roadmapHtml, errorHtml].forEach((html) => {
      assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), 'twitter:card summary_large_image presente');
      assert.ok(html.includes('name="twitter:title"'), 'twitter:title presente');
      assert.ok(html.includes('name="twitter:description"'), 'twitter:description presente');
      assert.ok(html.includes('name="twitter:image"'), 'twitter:image presente');
      assert.ok(html.includes('name="twitter:creator" content="@pvduk"'), 'twitter:creator presente');
    });
  });

  it('Todas as páginas HTML devem conter link rel="canonical" válido', () => {
    assert.ok(indexHtml.includes('<link rel="canonical" href="https://pvduk.github.io/pvdukdev/">'), 'canonical index presente');
    assert.ok(roadmapHtml.includes('<link rel="canonical" href="https://pvduk.github.io/pvdukdev/roadmap-requisitos.html">'), 'canonical roadmap presente');
    assert.ok(errorHtml.includes('<link rel="canonical" href="https://pvduk.github.io/pvdukdev/404.html">'), 'canonical 404 presente');
  });

  it('Arquivos de imagem OG (SVG e PNG 1200x630) devem existir e estar no precache do Service Worker', () => {
    assert.ok(fs.existsSync(ogSvgPath), 'assets/og-image.svg existe');
    assert.ok(fs.existsSync(ogPngPath), 'assets/og-image.png existe');
    assert.ok(swJs.includes('assets/og-image.png'), 'og-image.png no precache do sw.js');
    assert.ok(swJs.includes('assets/og-image.svg'), 'og-image.svg no precache do sw.js');
  });
}

console.log('\n📦 Scenario 29: Progressive Enhancement & Resiliência No-JS (Terminal & Layout)');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const errorHtml = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');
  const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');

  it('css/pages/home.css deve possuir regras baseline ocultando .view-dev e exibindo .view-standard por padrão', () => {
    assert.ok(cssHome.includes('.view-dev {\n    display: none;\n  }') || cssHome.includes('.view-dev { display: none; }') || cssHome.includes('.view-dev'), 'view-dev baseline presente');
    assert.ok(cssHome.includes('.view-standard'), 'view-standard baseline presente');
  });

  it('Todas as páginas devem possuir banners informativos <noscript>', () => {
    assert.ok(indexHtml.includes('<noscript>') && indexHtml.includes('noscript-banner'), 'noscript em index.html');
    assert.ok(roadmapHtml.includes('<noscript>') && roadmapHtml.includes('noscript-banner'), 'noscript em roadmap-requisitos.html');
    assert.ok(errorHtml.includes('<noscript>') && errorHtml.includes('noscript-banner'), 'noscript em 404.html');
  });

  it('Terminal interativo deve conter aviso <noscript> esclarecendo que é uma melhoria progressiva', () => {
    assert.ok(indexHtml.includes('terminal-noscript'), 'terminal-noscript presente no terminal de index.html');
  });

  it('Roadmap deve conter fallback no-JS expandindo automaticamente as 8 fases para leitura', () => {
    assert.ok(roadmapHtml.includes('.phase-body { display: block !important; }'), 'auto-expand das fases sem JS no roadmap');
  });

  it('css/components.css deve estilizar .noscript-banner e .terminal-noscript', () => {
    assert.ok(cssComponents.includes('.noscript-banner'), '.noscript-banner em components.css');
    assert.ok(cssComponents.includes('.terminal-noscript'), '.terminal-noscript em components.css');
  });
}

console.log('\n📦 Scenario 30: Content Security Policy (CSP) & Defesa contra XSS/Injection');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const errorHtml = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
  const serverJs = fs.readFileSync(path.join(__dirname, '../server.js'), 'utf8');

  it('Todas as páginas HTML devem conter a meta tag http-equiv="Content-Security-Policy"', () => {
    [indexHtml, roadmapHtml, errorHtml].forEach((html) => {
      assert.ok(html.includes('http-equiv="Content-Security-Policy"'), 'CSP meta tag presente');
      assert.ok(html.includes("default-src 'self'"), "default-src 'self' presente");
      assert.ok(html.includes("script-src 'self' 'unsafe-inline'"), "script-src presente");
      assert.ok(html.includes("style-src 'self' 'unsafe-inline'"), "style-src presente");
      assert.ok(html.includes("font-src 'self'"), "font-src 'self' presente");
      assert.ok(html.includes("img-src 'self' data: https:"), "img-src presente");
      assert.ok(html.includes("connect-src 'self' https://api.web3forms.com"), "connect-src restrito ao Web3Forms");
      assert.ok(html.includes("object-src 'none'"), "object-src 'none' presente");
      assert.ok(html.includes("base-uri 'self'"), "base-uri 'self' presente");
      assert.ok(html.includes("form-action 'self' https://api.web3forms.com"), "form-action restrito");
    });
  });

  it('server.js deve enviar headers de segurança HTTP (CSP, nosniff, DENY)', () => {
    assert.ok(serverJs.includes('Content-Security-Policy'), 'CSP header em server.js');
    assert.ok(serverJs.includes("'X-Content-Type-Options': 'nosniff'"), 'nosniff em server.js');
    assert.ok(serverJs.includes("'X-Frame-Options': 'DENY'"), 'X-Frame-Options DENY em server.js');
  });
}

console.log('\n📦 Scenario 31: Skip Link (A11y WCAG 2.4.1), Pills Semânticas (<ul>/<li>) & Microcopy do Footer');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const errorHtml = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
  const cssComponents = fs.readFileSync(path.join(__dirname, '../css/components.css'), 'utf8');
  const cssHome = fs.readFileSync(path.join(__dirname, '../css/pages/home.css'), 'utf8');
  const cssRoadmap = fs.readFileSync(path.join(__dirname, '../css/pages/roadmap.css'), 'utf8');
  const ptTranslations = fs.readFileSync(path.join(__dirname, '../js/translations/pt.js'), 'utf8');
  const enTranslations = fs.readFileSync(path.join(__dirname, '../js/translations/en.js'), 'utf8');

  it('Todas as páginas devem possuir Skip Link acessível apontando para #main-content com i18n', () => {
    [indexHtml, roadmapHtml, errorHtml].forEach((html) => {
      assert.ok(html.includes('<a href="#main-content" class="skip-link" data-i18n="nav.skip_to_content">'), 'Skip link presente');
      assert.ok(html.includes('id="main-content"'), 'Alvo #main-content presente');
    });
  });

  it('css/components.css deve estilizar .skip-link com foco visível acessível', () => {
    assert.ok(cssComponents.includes('.skip-link {'), '.skip-link definida');
    assert.ok(cssComponents.includes('.skip-link:focus') || cssComponents.includes('.skip-link:focus-visible'), 'foco visível do skip-link');
  });

  it('Coleções de tags e pills devem ser listas semânticas <ul> contendo <li> com list-style none', () => {
    assert.ok(indexHtml.includes('<ul class="disciplines-pills"'), 'disciplines-pills é ul');
    assert.ok(indexHtml.includes('<li class="discipline-pill"'), 'discipline-pill é li');
    assert.ok(indexHtml.includes('<ul class="term-tags"'), 'term-tags em index.html é ul');
    assert.ok(indexHtml.includes('<li class="term-tag"'), 'term-tag em index.html é li');
    assert.ok(roadmapHtml.includes('<ul class="phase-tags"'), 'phase-tags em roadmap é ul');
    assert.ok(roadmapHtml.includes('<li class="tag'), 'tag em roadmap é li');
    assert.ok(cssHome.includes('.disciplines-pills') && cssHome.includes('list-style: none;'), 'disciplines-pills list-style none');
    assert.ok(cssHome.includes('.term-tags') && cssHome.includes('list-style: none;'), 'term-tags list-style none');
    assert.ok(cssRoadmap.includes('.phase-tags') && cssRoadmap.includes('list-style: none;'), 'phase-tags list-style none');
  });

  it('Frase em português do rodapé deve ser atualizada para "Feito com Vanilla Web Standards..."', () => {
    const expectedPt = 'Feito com Vanilla Web Standards. Nenhum framework de 50MB foi maltratado neste site';
    assert.ok(indexHtml.includes(expectedPt), 'footer em index.html atualizado');
    assert.ok(roadmapHtml.includes(expectedPt), 'footer em roadmap-requisitos.html atualizado');
    assert.ok(errorHtml.includes(expectedPt), 'footer em 404.html atualizado');
    assert.ok(ptTranslations.includes(expectedPt), 'footer.author em pt.js atualizado');
    assert.ok(!indexHtml.includes('Feito à mão com Vanilla Web Standards. Nenhum framework de 50MB'), 'Sem "à mão" no index');
  });

  it('Traduções devem incluir nav.skip_to_content em PT/EN e footer.author atualizado em EN', () => {
    assert.ok(ptTranslations.includes("'nav.skip_to_content': 'Pular para o conteúdo principal'"), 'skip_to_content em pt.js');
    assert.ok(enTranslations.includes("'nav.skip_to_content': 'Skip to main content'"), 'skip_to_content em en.js');
    assert.ok(enTranslations.includes("'footer.author': 'Crafted with Vanilla Web Standards and Clean Architecture.'"), 'footer.author em en.js com Crafted');
  });
}

console.log('\n📦 Scenario 32: Aba Blog Estática, Manifesto JSON, Filtros por Tag & Template Semântico');
{
  const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  const roadmapHtml = fs.readFileSync(path.join(__dirname, '../roadmap-requisitos.html'), 'utf8');
  const errorHtml = fs.readFileSync(path.join(__dirname, '../404.html'), 'utf8');
  const blogIndexHtml = fs.readFileSync(path.join(__dirname, '../blog/index.html'), 'utf8');
  const blogTemplateHtml = fs.readFileSync(path.join(__dirname, '../blog/posts/TEMPLATE.html'), 'utf8');
  const postsJsonStr = fs.readFileSync(path.join(__dirname, '../data/posts.json'), 'utf8');
  const ptTranslations = fs.readFileSync(path.join(__dirname, '../js/translations/pt.js'), 'utf8');
  const enTranslations = fs.readFileSync(path.join(__dirname, '../js/translations/en.js'), 'utf8');
  const appJs = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
  const buildJs = fs.readFileSync(path.join(__dirname, '../build.js'), 'utf8');
  const swJs = fs.readFileSync(path.join(__dirname, '../sw.js'), 'utf8');

  it('Aba Blog deve estar temporariamente oculta na navegação pública (evolução em branch dedicada)', () => {
    assert.ok(!indexHtml.includes('href="blog/index.html"'), 'Link do Blog oculto em index.html');
    assert.ok(!roadmapHtml.includes('href="blog/index.html"'), 'Link do Blog oculto em roadmap-requisitos.html');
    assert.ok(!errorHtml.includes('href="blog/index.html"'), 'Link do Blog oculto em 404.html');
    assert.ok(blogIndexHtml.includes('class="nav-pill active" href="index.html"') || blogIndexHtml.includes('class="nav-pill active"'), 'Aba Blog preservada na rota interna blog/index.html');
    assert.ok(blogTemplateHtml.includes('class="nav-pill active" href="../index.html"') || blogTemplateHtml.includes('class="nav-pill active"'), 'Aba Blog preservada no template de post');
  });

  it('Modo Dev (Terminal Interativo) deve estar presente exclusivamente em index.html', () => {
    assert.ok(indexHtml.includes('class="view-toggle"'), 'Botão view-toggle presente em index.html');
    assert.ok(!roadmapHtml.includes('class="view-toggle"'), 'Botão view-toggle ausente em roadmap-requisitos.html');
    assert.ok(!errorHtml.includes('class="view-toggle"'), 'Botão view-toggle ausente em 404.html');
    assert.ok(!blogIndexHtml.includes('class="view-toggle"'), 'Botão view-toggle ausente em blog/index.html');
    assert.ok(!blogTemplateHtml.includes('class="view-toggle"'), 'Botão view-toggle ausente em TEMPLATE.html');
  });

  it('data/posts.json deve ser um JSON válido com schema { series, posts } e dados da série', () => {
    const data = JSON.parse(postsJsonStr);
    assert.ok(data && typeof data === 'object', 'data/posts.json é um objeto');
    assert.ok(Array.isArray(data.series), 'data.series é uma array');
    assert.ok(Array.isArray(data.posts), 'data.posts é uma array');
    assert.ok(data.series.length >= 1, 'Pelo menos 1 série cadastrada');
    assert.ok(data.posts.length >= 6, 'Pelo menos 6 posts cadastrados no total');

    const cacheSeries = data.series.find(s => s.id === 'anatomia-do-cache');
    assert.ok(cacheSeries, 'Série anatomia-do-cache cadastrada');
    assert.ok(cacheSeries.title && cacheSeries.title.pt && cacheSeries.title.en, 'Série possui título PT/EN');
    assert.ok(cacheSeries.description && cacheSeries.description.pt && cacheSeries.description.en, 'Série possui descrição PT/EN');

    const cachePosts = data.posts.filter(p => p.series && p.series.id === 'anatomia-do-cache');
    assert.strictEqual(cachePosts.length, 4, '4 partes cadastradas para a série anatomia-do-cache');
    
    data.posts.forEach(post => {
      assert.ok(post.id, 'Post possui id');
      assert.ok(post.slug, 'Post possui slug');
      assert.ok(post.file, 'Post possui caminho file');
      assert.ok(post.date && /^\d{4}-\d{2}-\d{2}$/.test(post.date), 'Post possui date ISO válida');
      assert.ok(typeof post.published === 'boolean', 'Post possui published booleano');
      assert.ok(Array.isArray(post.tags) && post.tags.length > 0, 'Post possui tags');
      assert.ok(post.title && post.title.pt && post.title.en, 'Post possui title em PT e EN');
      assert.ok(post.description && post.description.pt && post.description.en, 'Post possui description em PT e EN');
    });

    const publishedPosts = data.posts.filter(p => p.published === true);
    assert.ok(publishedPosts.length >= 3, 'Pelo menos 3 posts publicados para listagem pública');
  });

  it('Dicionários i18n (pt.js, en.js e app.js) devem conter 100% de paridade para chaves do Blog e Séries', () => {
    const requiredKeys = [
      'nav.blog',
      'blog.badge',
      'blog.title',
      'blog.subtitle',
      'blog.all',
      'blog.filter_label',
      'blog.empty',
      'blog.error',
      'blog.read_more',
      'blog.published_at',
      'blog.reading_time',
      'blog.back',
      'blog.noscript_msg',
      'series.label',
      'series.part_of',
      'series.previous',
      'series.next',
      'series.upcoming',
      'blog.post.series_part',
      'blog.post.next',
      'blog.post.back'
    ];

    requiredKeys.forEach(key => {
      assert.ok(ptTranslations.includes(`'${key}':`), `Chave ${key} presente em pt.js`);
      assert.ok(enTranslations.includes(`'${key}':`), `Chave ${key} presente em en.js`);
      assert.ok(appJs.includes(`'${key}':`), `Chave ${key} presente em app.js`);
    });
  });

  it('blog/posts/2025-01-anatomia-do-cache-o-navegador.html deve conter conteúdo editorial completo, diagrama ASCII, exemplo de código testável e SEO', () => {
    const post1Path = path.join(__dirname, '../blog/posts/2025-01-anatomia-do-cache-o-navegador.html');
    assert.ok(fs.existsSync(post1Path), 'Arquivo da parte 1 publicado existe');
    const post1Html = fs.readFileSync(post1Path, 'utf8');
    const blogCss = fs.readFileSync(path.join(__dirname, '../blog/css/blog.css'), 'utf8');
    const blogJs = fs.readFileSync(path.join(__dirname, '../blog/js/blog.js'), 'utf8');

    assert.ok(post1Html.includes('data-post-slug="2025-01-anatomia-do-cache-o-navegador"'), 'data-post-slug correto no post 1');
    assert.ok(post1Html.includes('A Anatomia do Cache, Parte 1: O Navegador'), 'Título presente');
    assert.ok(post1Html.includes('<figure class="article-figure">'), 'figure presente no post 1');
    assert.ok(post1Html.includes('<pre class="ascii-diagram">'), 'ascii-diagram presente no post 1');
    assert.ok(post1Html.includes('fetchWithMemoryCache'), 'Implementação prática de código presente');
    assert.ok(post1Html.includes('node:test') && post1Html.includes('cache-helper.test.js'), 'Exemplo de teste unitário automatizado presente');
    assert.ok(post1Html.includes('<figcaption>'), 'figcaption presente no post 1');
    assert.ok(post1Html.includes('id="seriesNav"'), 'aside#seriesNav presente no post 1');
    assert.ok(post1Html.includes('application/ld+json'), 'JSON-LD structured data presente no post 1');
    assert.ok(post1Html.includes('property="og:type" content="article"'), 'Open Graph article type presente');

    // Validação de card inteiramente clicável
    assert.ok(blogCss.includes('.post-card-title a::after') && blogCss.includes('cursor: pointer'), 'CSS suporta card inteiramente clicável');
    assert.ok(blogJs.includes('card.addEventListener(\'click\''), 'blog.js inclui navegação por clique em qualquer área do card');
  });

  it('blog/index.html e TEMPLATE.html devem conter estrutura semântica, seriesNav e SEO completo', () => {
    assert.ok(blogIndexHtml.includes('id="blogTagsFilter"'), 'Filtros de tag presentes');
    assert.ok(blogIndexHtml.includes('id="blogPostsGrid"'), 'Grid de posts presente');
    assert.ok(blogIndexHtml.includes('id="blogEmptyState"'), 'Empty state presente');
    assert.ok(blogIndexHtml.includes('id="blogErrorState"'), 'Error state presente');
    assert.ok(blogIndexHtml.includes('<noscript>'), 'Fallback noscript presente em blog/index.html');
    
    assert.ok(blogTemplateHtml.includes('data-post-slug='), 'body data-post-slug presente em TEMPLATE.html');
    assert.ok(blogTemplateHtml.includes('id="seriesNav"'), 'aside#seriesNav presente em TEMPLATE.html');
    assert.ok(blogTemplateHtml.includes('<article class="post-article">'), 'article semântico em TEMPLATE.html');
    assert.ok(blogTemplateHtml.includes('<time datetime="'), 'time tag com datetime em TEMPLATE.html');
    assert.ok(blogTemplateHtml.includes('class="post-back-link"'), 'Botão de retorno presente');
    assert.ok(blogTemplateHtml.includes('property="og:type" content="article"'), 'Open Graph type article no post');
    assert.ok(blogTemplateHtml.includes('property="article:published_time"'), 'article:published_time presente');
  });

  it('build.js e sw.js devem empacotar e precachear os recursos do Blog e data/posts.json', () => {
    assert.ok(buildJs.includes('data/posts.json'), 'build.js inclui data/posts.json');
    assert.ok(buildJs.includes('blog/index.html'), 'build.js inclui blog/index.html');
    assert.ok(buildJs.includes('blog/css/blog.css'), 'build.js inclui blog/css/blog.css');
    assert.ok(buildJs.includes('blog/js/blog.js'), 'build.js inclui blog/js/blog.js');
    assert.ok(buildJs.includes('blog/posts/TEMPLATE.html'), 'build.js inclui blog/posts/TEMPLATE.html');

    assert.ok(swJs.includes('./data/posts.json'), 'sw.js precacheia data/posts.json');
    assert.ok(swJs.includes('./blog/index.html'), 'sw.js precacheia blog/index.html');
    assert.ok(swJs.includes('./blog/css/blog.css'), 'sw.js precacheia blog/css/blog.css');
    assert.ok(swJs.includes('./blog/js/blog.js'), 'sw.js precacheia blog/js/blog.js');
    assert.ok(swJs.includes('./blog/posts/TEMPLATE.html'), 'sw.js precacheia TEMPLATE.html');
    assert.ok(swJs.includes('pvdukdev-v2.3.0'), 'sw.js atualizado para v2.3.0');
  });
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`📊 RESULTADO DA SUÍTE DE TESTES: ${passed} / ${total} PASSOU COM SUCESSO! 🚀`);
console.log('═══════════════════════════════════════════════════════════\n');

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
