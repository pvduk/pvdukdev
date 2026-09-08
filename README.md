# 🚀 pvduk · dev | Engineering Portfolio and Architectural Hub

> **Portfólio de Engenharia de Software e Arquitetura de Sistemas de Alta Performance**, desenvolvido 100% com **Vanilla Web Standards (ES2026)**, Progressive Web App (PWA), Dual-Mode Layout (Executivo e Terminal Interativo), Estudo de Caso Prático (Framework COSTAR), CI/CD nativo no GitHub Pages e Suíte de Testes BDD/TDD Automatizada.

---

## 📋 Índice

- [Visão Geral e O que o Projeto Engloba](#-visão-geral-e-o-que-o-projeto-engloba)
- [Tecnologias Utilizadas e Versões](#-tecnologias-utilizadas-e-versões)
- [Arquitetura e Estrutura de Diretórios](#-arquitetura-e-estrutura-de-diretórios)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Blog de Engenharia e Artigos Técnicos](#-blog-de-engenharia-e-artigos-técnicos)
- [Progressive Web App (PWA) e Offline Shell](#-progressive-web-app-pwa-e-offline-shell)
- [Página 404 · NullReferenceException (Nível Dev)](#-página-404--nullreferenceexception-nível-dev)
- [Engenharia de Código Limpo e Diretrizes Anti-IA](#-engenharia-de-código-limpo-e-diretrizes-anti-ia)
- [Como Executar e Compilar o Projeto](#-como-executar-e-compilar-o-projeto)
- [Deploy Automatizado no GitHub Pages (CI/CD)](#-deploy-automatizado-no-github-pages-cicd)
- [Suíte de Testes Automatizada (BDD / TDD)](#-suíte-de-testes-automatizada-bdd--tdd)
- [Auditoria de Qualidade (Uncle Bob Quality Gate)](#-auditoria-de-qualidade-uncle-bob-quality-gate)
- [Licença e Autor](#-licença-e-autor)

---

## 🎯 Visão Geral e O que o Projeto Engloba

O projeto consiste em um ecossistema web de engenharia com **Zero Runtime Dependencies**, projetado para demonstrar excelência em **Clean Code**, **Clean Architecture**, **System Design**, **Acessibilidade WCAG 2.2 AAA** e **Web Performance**.

O ecossistema engloba:

### 1. Dual-Mode Interface Engine
- **Modo Padrão (The Architectural Engineer):**
  - **Hero Executivo:** Apresentação sênior, badges de especialidades e status com pulso de radar CSS 100% acelerado por GPU (`.status-dot::after`).
  - **Métricas de Impacto:** Painel visual com destaques de engenharia (8 fases, caso real, framework decisório, zero runtime).
  - **Abas de Projetos Flagship (Showcase):** Alternador acessível WAI-ARIA com 4 projetos de ponta: *FirstStrike Analytics* (SaaS Quantitativo de NBA), *Planexa OS* (Desktop Nativo em .NET 10 / Photino), *FirstStrike Ops* (Torre de Controle) e o *Roadmap de Engenharia*.
  - **Especialidades Técnicas:** Cards detalhando competências em Frontend Puro, Design de Sistemas (DDD/Microservices) e DevOps/IaC.
  - **Ápices nos Projetos (Timeline):** Linha do tempo estruturada com marcos técnicos e trajetórias de alto impacto.
  - **Fale Conosco (Smart Email Composer):** Formulário assíncrono com seleção de tags rápidas de assunto, feedback visual em tempo real e envio silencioso via Web3Forms API.
  - **Conexões Profissionais:** Cards com conformidade WCAG 2.5.3 (*Label in Name*) e links seguros (`target="_blank"`, `rel="noopener noreferrer"`) para GitHub (`@pvduk`) e LinkedIn (`in/pvduk`).
- **Modo Dev (Interactive CLI Terminal Station):**
  - Emulador de terminal UNIX/ZSH interativo no navegador.
  - Arquitetura **SOLID (Open/Closed Principle)** baseada em `commandRegistry` e `commandAliases` desacoplados.
  - Interpretador de comandos: `whoami`, `projects`, `story`, `contact`, `costar`, `theme`, `lang`, `clear`, `help`, `history`, `date`.
  - Atalhos com chips clicáveis, preenchimento dinâmico, auto-foco com `preventScroll: true` e sanitização anti-XSS via `escapeHtml()`.

### 2. Estudo de Caso Prático · Roadmap de Requisitos (FirstStrike Analytics)
- **Framework COSTAR Aplicado:** Matriz de decisão cobrindo Contexto, Objetivo, Stakeholders, Transformação, Arquitetura e Rastreabilidade.
- **8 Fases de Engenharia de Software:**
  1. Discovery e Alinhamento da Dor de Negócio (Gherkin BDD, Personas).
  2. Atores, Fronteiras e Diagrama C4 de Contexto (Nível 1).
  3. Requisitos Funcionais, MoSCoW e BDD Gherkin.
  4. Modelagem de Domínio (DDD) e Persistência NoSQL (MongoDB/PostgreSQL).
  5. Decisões de Arquitetura em C# .NET e ADRs (Clean Architecture em 4 Camadas).
  6. Segurança, Rate Limiting e Edge Caching (RFC-7234).
  7. Stack Tecnológica e Docker Multi-Container Reproduzível.
  8. Gate de Qualidade, Contratos de API e Entrada em Produção.
- **Accordion Interativo com Barra de Progresso:** Cálculo dinâmico em tempo real de fases exploradas pelo usuário.
- **Infoboxes Temáticos de Alto Contraste:** Tokens semânticos dedicados (`--ib-blue-*`) garantindo legibilidade perfeita no Dark e Light Mode.

### 3. Blog de Engenharia e Artigos Técnicos
- **Arquitetura Estática com Progressive Enhancement:** Listagem dinâmica orientada a manifesto JSON (`data/posts.json`) com renderização client-side e fallback 100% legível via `<noscript>`.
- **Navegação de Séries Técnicas:** Suporte nativo a artigos em capítulos (ex.: *Anatomia do Cache no Navegador*), exibindo metadados de série, paginação anterior/próximo e cards de leitura recomendada.
- **Voz Humana e Diretrizes Anti-IA:** Textos concebidos segundo o fluxo `writing-flow-orchestrator.md`, livres de clichês de IA, com histórias reais de produção, opiniões contundentes e total abolição do `&` como conjunção aditiva.

### 4. Motor de Internacionalização (i18n) e Temas
- **Internacionalização Bilíngue em Tempo Real (PT ⇄ EN):** Suporte nativo a Português (`pt-BR`) e Inglês (`en`), com persistência em `localStorage` e detecção automática do idioma do navegador sem recarregar a página.
- **Dark Mode e Light Mode:** Paleta sóbria com contraste AAA, script anti-FOUC síncrono no `<head>` (Zero Flash no Reload) e transição fluida com **Document View Transitions API**.

---

## 🛠️ Tecnologias Utilizadas e Versões

| Categoria | Tecnologia / Padrão | Versão / Especificação | Finalidade no Projeto |
|---|---|:---:|---|
| **Linguagem Base** | **HTML5 Semântico** | W3C Living Standard (2026) | Estrutura semântica, acessibilidade (ARIA), SEO e Open Graph. |
| **Estilização e Tokens** | **CSS3 Moderno** | W3C Recommendation (2026) | Cascade Layers (`@layer`), CSS Grid Nível 2, Flexbox, Sticky Footer Universal (`100dvh`), animações GPU composited. |
| **Motor de Scripting** | **JavaScript (ES2026 Baseline)** | ECMAScript 2026 | DOM Manipulation, View Transitions API, `commandRegistry` OCP, `Object.freeze`, `FormData` e `fetch` assíncrono. |
| **PWA e Offline** | **Service Worker e Webmanifest** | W3C PWA Standards | Cache First para App Shell, instalação PWA nativa no macOS/Windows/iOS/Android. |
| **Vetorização Gráfica** | **SVG Inline** | SVG 2.0 W3C | Ícones vetoriais padronizados e vetor de marca com anel luminoso (*glass ring*). |
| **Tipografia UI** | **Inter (WOFF2 Local)** | Self-Hosted Local WOFF2 | Headings de impacto, geometria limpa e zero latência de terceiros. |
| **Tipografia Código** | **JetBrains Mono (WOFF2 Local)** | Self-Hosted Local WOFF2 | Terminal do Modo Dev, badges e snippets com ligaduras OpenType locais. |
| **Serviço de Mensagens** | **Web3Forms API** | REST API v1 | Endpoint Serverless assíncrono para recebimento de e-mails com `Reply-To` direto. |
| **Compilação e Build** | **Node.js (Módulos Nativos)** | v18.0.0+ / v20.0.0+ / v22.0.0+ | Minificador zero-dependency (`build.js`) gerando o bundle `./dist` em ~30ms. |
| **Ambiente de Testes** | **Node.js Test Runner / Assert** | Node.js Core | 36 cenários BDD/TDD automatizados (126 asserções) sem pacotes npm externos. |
| **Hospedagem e CI/CD** | **GitHub Pages e Actions** | GitHub Pages v4 | Deploy automático no `push main` com bypass do Jekyll (`.nojekyll`). |

---

## 📂 Arquitetura e Estrutura de Diretórios

```
pvdukdev/
├── index.html                    # Hub Principal (Dual-Mode: Standard e Dev CLI, Abas Flagship)
├── roadmap-requisitos.html       # Estudo de Caso FirstStrike Analytics (8 Fases e COSTAR)
├── 404.html                      # Página 404 Dev Customizada ("NullReferenceException")
├── manifest.webmanifest          # Manifesto PWA com rotas relativas e shortcuts
├── sw.js                         # Service Worker PWA (Cache First App Shell)
├── server.js                     # Servidor local Node.js com Clean URLs e fallback 404
├── build.js                      # Compilador de minificação nativo zero-dependency
├── package.json                  # Manifesto do projeto com scripts (dev, build, test)
├── .nojekyll                     # Bypass do processador Jekyll para o GitHub Pages
├── .gitignore                    # Bloqueio estrito de credenciais, logs e builds
├── README.md                     # Documentação técnica completa
│
├── blog/                         # Blog de Engenharia e Artigos Técnicos
│   ├── index.html                # Listagem dinâmica de artigos com filtros por tag
│   ├── js/
│   │   └── blog.js               # Renderizador client-side, i18n e navegador de séries
│   └── posts/
│       ├── TEMPLATE.html         # Template semântico para novos artigos técnicos
│       └── 2026-08-anatomia-do-cache-o-navegador.html
│
├── data/
│   └── posts.json                # Manifesto estático de artigos e séries do blog
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # Pipeline CI/CD automatizada do GitHub Actions
│
├── assets/
│   ├── logo.svg                  # Marca visual vetorial (Favicon, Header, Apple Icon)
│   ├── icon-192.png              # Ícone PWA 192x192px
│   ├── icon-512.png              # Ícone PWA 512x512px
│   ├── og-image.png              # Imagem Open Graph 1200x630
│   ├── fonts/                    # Fontes locais WOFF2 (Inter e JetBrains Mono)
│   └── projects/                 # Badges e ícones das abas flagship
│
├── css/
│   ├── base.css                  # Reset, tipografia, tokens temáticos e @layer
│   ├── components.css            # Topbar unificada, pills, badges, infoboxes e sticky footer
│   └── pages/
│       ├── home.css              # Estilos do Hub Executivo, abas e Terminal Dev
│       ├── roadmap.css           # Estilos do Roadmap de Requisitos e Accordion
│       └── blog.css              # Estilos do Blog, listagem, filtros e posts editoriais
│
├── js/
│   ├── app.js                    # Motor central: i18n, Theme, ViewMode, Terminal OCP e PWA
│   └── translations/
│       ├── pt.js                 # Dicionário de tradução Português (Single Source of Truth)
│       └── en.js                 # Dicionário de tradução Inglês (Single Source of Truth)
│
├── test/
│   └── bdd-interactions.test.js  # Suíte automatizada de testes BDD/TDD (35 Cenários / 121 Testes)
│
└── docs/
    ├── vision-document.md        # Documento de Visão do Produto (Fase 00)
    └── uncle-bob-audit-report.md # Relatório da Auditoria de Qualidade Uncle Bob
```

---

## 📱 Progressive Web App (PWA) e Offline Shell

O projeto foi transformado em um **PWA Completo** de acordo com os padrões da W3C:

1. **Ícones Vetoriais e PNGs de Alta Fidelidade:**
   - Ícones de 192x192 e 512x512 com propósito `maskable` e `any` perfeitamente alinhados com o design da marca (`assets/logo.svg`).
2. **Service Worker Inteligente ([sw.js](sw.js)):**
   - **Precache do App Shell:** Salva instantaneamente em cache os arquivos HTML, CSS, JS, manifest e ícones no evento `install`.
   - **Interceptação `fetch`:** Estratégia *Cache-First with Network Fallback* garantindo carregamento instantâneo offline.
   - **Gestão de Versões:** Limpeza automática de caches legados no ciclo `activate`.
3. **Experiência de App Nativo:**
   - Instalação no macOS Dock, Windows Taskbar, Android Home Screen e iOS via Safari.
   - Suporte a **Shortcuts Rápidos** no menu do app (Roadmap de Requisitos e Modo Dev).

---

## 🎭 Página 404 · NullReferenceException (Nível Dev)

Criada através do framework de brainstorming ([_agents/workflows/brainstorning-orq.md](_agents/workflows/brainstorning-orq.md)), a página **[404.html](404.html)** é integrada ao Design System e conta com:
- **Badge e Título:** `// FATAL: 0x00000404 · Segment Fault in /dev/null` e `404 · NullReferenceException`.
- **Root Cause Analysis (Diagnóstico de Engenharia):**
  - *Hipótese 01: O estagiário deu git push --force na sexta-feira às 18h.*
  - *Hipótese 02: O Garbage Collector coletou esta página por considerá-la unreachable.*
  - *Hipótese 03: Você tentou acessar uma rota sem colocar ponto-e-vírgula no final.*
- **Ações Rápidas:** Botões `cd /home ➔`, `git checkout roadmap ➔` e o botão interativo `☕ sudo make-coffee` (com resposta HTTP 418 bilíngue).

---

## 🏛️ Engenharia de Código Limpo e Diretrizes Anti-IA

- **DRY (Don't Repeat Yourself):** Dicionários `js/translations/pt.js` e `js/translations/en.js` operam como fonte única da verdade com 100% de simetria de chaves auditada por testes.
- **YAGNI (You Aren't Gonna Need It):** Expurgados módulos órfãos não utilizados (`js/i18n.js` e `js/theme.js`) e limpas as referências correspondentes no Service Worker.
- **SOLID (Open/Closed Principle):** O terminal interativo em `js/app.js` foi refatorado de um bloco monolítico `switch/case` de 250 linhas para um **`commandRegistry` declarativo**. Novos comandos podem ser adicionados sem alterar o motor central.
- **KISS e Minificação Zero-Dependency ([build.js](build.js)):** Compilador nativo em Node.js puro sem dependências pesadas de terceiros (Webpack/Vite), gerando a pasta `dist/` com **50 KB de economia (-22.5%)** em **~30 milissegundos**.
- **Diretriz Inegociável Anti-IA (Tell 13 · Abolição Absoluta do &):** No português, o uso do caractere `&` substituindo a conjunção "e" em títulos, subtítulos, tags e textos em geral é o Tell 13 de IA: uma assinatura imediata de texto gerado por máquina. O ecossistema pvduk.dev adota a eliminação total de `&` em toda a interface, código e cópia editorial, exigindo a conjunção humana natural "e" (ou "and" em inglês).

---

## 🚀 Como Executar e Compilar o Projeto

### 1. Executar Localmente em Modo Desenvolvimento

```bash
# Iniciar o servidor HTTP nativo com suporte a PWA e Clean URLs
npm start
# ou
npm run dev
```

Acesse no navegador: **`http://localhost:3000`**

### 2. Gerar o Bundle Minificado de Produção

```bash
# Compilar e minificar HTML, CSS, JS e assets para a pasta ./dist
npm run build
```

---

## 🌐 Deploy Automatizado no GitHub Pages (CI/CD)

O projeto conta com uma pipeline nativa do **GitHub Actions** em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Fluxo Automático a cada `git push main`:
1. Realiza checkout do código.
2. Executa a suíte de testes BDD/TDD (`npm test`).
3. Gera o build otimizado em `./dist` (`npm run build`).
4. Publica os artefatos diretamente no **GitHub Pages** com HTTPS e SSL automático.

---

## 🧪 Suíte de Testes Automatizada (BDD / TDD)

O projeto possui **36 Cenários Automatizados** e **126 Testes BDD/TDD** implementados em Node.js puro:

```bash
npm test
```

### Relatório de Cobertura dos Testes:
```
═══════════════════════════════════════════════════════════
🧪 SUÍTE DE TESTES BDD/TDD · VALIDAÇÃO DE INTERAÇÃO
═══════════════════════════════════════════════════════════

📦 Scenario 1: Alternância do Modo Dev (Standard ⇄ Dev Mode) (4/4 PASS)
📦 Scenario 2: Execução de Comandos no Terminal Interativo (4/4 PASS)
📦 Scenario 3: Alternância Dinâmica de Idioma (i18n) (3/3 PASS)
📦 Scenario 4: Alternância de Tema (Dark ⇄ Light) com Ícone SVG (3/3 PASS)
📦 Scenario 5: Interações do Roadmap de Requisitos (2/2 PASS)
📦 Scenario 6: Smart Email Composer com Web3Forms (Async Fetch) (3/3 PASS)
📦 Scenario 7: Seção 05 de Conexões (GitHub e LinkedIn) (1/1 PASS)
📦 Scenario 8: Auditoria de Paridade de i18n (PT ⇄ EN) e Vetorização SVG (3/3 PASS)
📦 Scenario 9: Consistência do Header e Transição de Rotas (2/2 PASS)
📦 Scenario 10: Bandeiras em SVG, Gap de 7px e Tradução no Hero (3/3 PASS)
📦 Scenario 11: Validação de Responsividade Mobile e CSS Design System (3/3 PASS)
📦 Scenario 12: Topbar Grid Centering e Mobile Fat Finger Protection (4/4 PASS)
📦 Scenario 13: Prevenção de FOUC de Tema e Zero Flash no Reload (6/6 PASS)
📦 Scenario 14: Borda Luminosa e Halo do Logo no Tema Escuro (2/2 PASS)
📦 Scenario 15: Roadmap 8 Fases i18n Dinâmico e FirstStrike Analytics (3/3 PASS)
📦 Scenario 16: Roadmap Layout Integrity e Proteção Responsiva Mobile (2/2 PASS)
📦 Scenario 17: Modo Dev Terminal Dinâmico e Alternância de Idioma em Tempo Real (3/3 PASS)
📦 Scenario 18: Blindagem Mobile do Terminal Dev (WCAG 2.2 AA e Anti-Overflow) (3/3 PASS)
📦 Scenario 19: Sticky Footer Universal Fixo no Bottom (Standard e Dev Mode) (3/3 PASS)
📦 Scenario 20: Progressive Web App (PWA) Baseline e Service Worker (5/5 PASS)
📦 Scenario 21: Prevenção de Auto-Scroll no Carregamento Inicial (2/2 PASS)
📦 Scenario 22: Auditoria de Segurança e GitHub Pages CI/CD Deploy Gate (3/3 PASS)
📦 Scenario 23: Contraste e Legibilidade Temática de Infoboxes (3/3 PASS)
📦 Scenario 24: Auditoria Lighthouse e Acessibilidade Mobile (3/3 PASS)
📦 Scenario 25: Engenharia de Código Limpo (KISS, YAGNI, DRY, SOLID e Zero-Dep Build) (4/4 PASS)
📦 Scenario 26: Otimização Crítica de Tipografia e Self-Hosted WOFF2 (Zero Latência de Terceiros) (4/4 PASS)
📦 Scenario 27: Zero Inline Styles e Separação Estrita de Responsabilidades (SoC e BEM) (4/4 PASS)
📦 Scenario 28: SEO Nativo, Open Graph (1200x630) e Twitter Cards (4/4 PASS)
📦 Scenario 29: Progressive Enhancement e Resiliência No-JS (Terminal e Layout) (5/5 PASS)
📦 Scenario 30: Content Security Policy (CSP) e Defesa contra XSS/Injection (2/2 PASS)
📦 Scenario 31: Skip Link (A11y WCAG 2.4.1), Pills Semânticas e Direitos Reservados (6/6 PASS)
📦 Scenario 32: Aba Blog Estática, Manifesto JSON, Filtros por Tag e Template Semântico (7/7 PASS)
📦 Scenario 33: Integridade de Links, Sitemap XML, Robots.txt e Resiliência Offline do SW (3/3 PASS)
📦 Scenario 34: Abas de Projetos Flagship (FirstStrike, Planexa OS, FirstStrike Ops e Roadmap) (4/4 PASS)
📦 Scenario 35: Conformidade Mobile e Otimização de Assets (Flagship e Especialidades) (4/4 PASS)
📦 Scenario 36: Diretriz Inegociável Anti-IA · Proibição Absoluta do Caractere "&" como Conjunção (5/5 PASS)

═══════════════════════════════════════════════════════════
📊 RESULTADO DA SUÍTE DE TESTES: 126 / 126 PASSOU COM SUCESSO! 🚀
═══════════════════════════════════════════════════════════
```

---

## 🧐 Auditoria de Qualidade (Uncle Bob Quality Gate)

Auditado continuamente de acordo com o workflow [`_agents/workflows/uncle-bob-audit.md`](_agents/workflows/uncle-bob-audit.md):

- **Score Geral:** 🏆 **100 / 100**
- **Testabilidade:** 100/100 (126 asserções automatizadas BDD/TDD)
- **Complexidade Ciclomática:** $\le 3$ em todas as funções.
- **Acessibilidade:** 100/100 (Contraste WCAG 2.2 AAA e WCAG 2.5.3 Label in Name).
- **Acoplamento:** Zero dependências externas de runtime.

---

## 👤 Autor

**Paulo Dukven (pvduk)**  
- **E-mail:** [paulo.dukven@gmail.com](mailto:paulo.dukven@gmail.com)  
- **GitHub:** [@pvduk](https://github.com/pvduk)  
- **LinkedIn:** [in/pvduk](https://linkedin.com/in/pvduk)  
- **Portfólio:** [pvduk.dev](index.html)
