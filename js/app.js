/**
 * COSTAR SUITE · UNIVERSAL ENGINE (Vanilla JS ES6+)
 * 100% compatível com abertura direta por duplo-clique (protocolo file://)
 * e também via servidores HTTP locais (localhost).
 * Zero dependências externas, zero bloqueio de CORS de módulos.
 */

(function () {
  'use strict';

  // ═════════════════════════════════════════════════════════════════
  // DICIONÁRIOS i18n UNIVERSAIS
  // ═════════════════════════════════════════════════════════════════
  const dictionaries = {
    pt: {
  // ─── Topbar e Navegação ───
  'nav.skip_to_content': 'Pular para o conteúdo principal',
  'nav.home': 'Início',
  'nav.roadmap': 'Roadmap',
  'nav.blog': 'Blog',
  'nav.system_design': '02 · System Design',
  'nav.brand': 'pvduk · dev',
  'nav.series': 'Engenheiro de Software',
  'btn.lang': 'PT',
  'btn.theme_toggle': 'Alternar Tema',
  'btn.dev_mode': 'Modo Dev',
  'btn.std_mode': 'Modo Padrão',
  'footer.copyright': '© 2026 pvduk.dev · Todos os direitos reservados.',
  'footer.author': 'Feito com Vanilla Web Standards. Nenhum framework de 50MB foi maltratado neste site',

  // ─── Home Hub: Modo Padrão (Opção 1 · The Architectural Engineer) ───
  'hub.author_name': 'Paulo Dukven',
  'hub.badge_status': 'Disponível para projetos e consultoria',
  'hub.hero_title': 'Engenheiro de Software e<br><em>FullStack C#/React</em>',
  'hub.hero_tagline': 'Especialista em arquitetura limpa, sistemas distribuídos, performance web e desenvolvimento frontend puro.',
  'hub.btn_explore': 'Explorar Portfólio ↓',
  'hub.btn_contact': 'Fale Conosco ⟶',

  // Disciplinas Técnicas
  'disc.system_design': 'System Design',
  'disc.clean_arch': 'Clean Architecture',
  'disc.web_perf': 'Web Performance (CWV)',
  'disc.avalonia_ui': 'Avalonia UI',
  'disc.sql_nosql': 'SQL e NoSQL',
  'disc.iac_docker': 'IaC e Docker',

  // Seções
  'hub.section_flagship': 'Projeto em Destaque',
  'hub.section_projects': 'Especialidades Técnicas',
  'hub.section_story': 'Ápices nos Projetos',
  'hub.section_contact': 'Fale Conosco',
  'hub.section_connections': 'Conexões',

  // Abas de Projetos Flagship
  'projects.tab_analytics': 'FirstStrike Analytics',
  'projects.tab_ops': 'FirstStrike Ops',
  'projects.tab_planexa': 'Planexa OS',
  'projects.tab_roadmap': 'Roadmap de Requisitos',

  // FirstStrike Analytics SaaS
  'analytics.tag': 'Produção Live · IA e Modelagem Quantitativa · FullStack .NET 10 / React 19',
  'analytics.title': 'FirstStrike Analytics ⚡ · Plataforma Quantitativa da NBA',
  'analytics.desc': 'Engine analítica que roda 10.000 simulações de Monte Carlo por cenário para precificar probabilidades e valor esperado (EV+) na NBA. Desenhada para eliminar a latência computacional: cálculo pesado em background (.NET 10 assíncrono) e entrega instantânea em React 19 na borda.',
  'analytics.feat1': 'Dual-Scope Analytics: Modelagem estatística especializada para 1º Quarto e Jogo Completo',
  'analytics.feat2': 'Joint Monte Carlo Engine: 10.000 iterações para cálculo de probabilidades conjuntas e canibalização de volume',
  'analytics.feat3': 'Projeções Táticas com Gemini: Análise contextual com cadeia de contingência automática de rate limits',
  'analytics.feat4': 'Ambiente Docker Compose + PWA Universal: Backend .NET 10, Frontend React 19 + Tailwind v4 e MongoDB Atlas',
  'analytics.btn': 'Acessar FirstStrike Analytics ↗',
  'analytics.badge': 'Live em Produção · firststrikeanalytics.com.br',

  // Volumes COSTAR
  'vol1.tag': 'Projeto Principal · Processo e Estudo de Caso',
  'vol1.title': 'Roadmap de Engenharia e Requisitos',
  'vol1.desc': 'Guia estruturado em 8 fases com o estudo de caso real do projeto FirstStrike Analytics: do discovery de negócio ao Gate de Entrada no Sprint 0.',
  'vol1.feat1': 'Exemplo prático, simples e intuitivo para qualquer usuário',
  'vol1.feat2': 'Diagramas C4 Nível 1, DDD e tabelas NoSQL',
  'vol1.feat3': 'Contrato OpenAPI 3.0 e ambiente Docker Compose real',
  'vol1.btn': 'Acessar Roadmap Interativo ⟶',

  // Planexa OS
  'planexa.tag': 'Desktop Nativo · Clean Architecture · 100% Offline-First',
  'planexa.title': 'Planexa OS 💎⚡ · Fluxo Executivo e Gantt Nativo',
  'planexa.desc': 'Sistema operacional desktop de alta densidade para engenharia PJ, estudos e gestão. Pomodoro reativo integrado ao TanStack Query, cronograma Gantt vetorial SVG com diluição proporcional de prazos, editor TipTap WYSIWYG de matrizes Markdown e dual workspaces (Profissional vs Acadêmico).',
  'planexa.feat1': 'Stack moderna: .NET 10 + C# 14 + Photino.NET (Nativo sem Electron, <40MB RAM)',
  'planexa.feat2': 'Frontend reativo: React 19 + TypeScript 5.9 + Tailwind CSS v4 (@theme semântico)',
  'planexa.feat3': 'Persistência local relacional em SQLite com auto-migração de schema em runtime',
  'planexa.feat4': 'Engenharia de excelência: 146 testes automatizados (100% aprovados) e Uncle Bob Quality Gate 98/100',
  'planexa.badge': 'Aplicação Desktop Nativa · 100% Offline',

  // FirstStrike Ops
  'ops.tag': 'Torre de Controle · Observabilidade · Auditoria Matemática',
  'ops.title': 'FirstStrike Ops 🛡️ · Torre de Controle Operacional',
  'ops.desc': 'Torre de controle operacional e observabilidade em tempo real do ecossistema FirstStrike Analytics. Pipeline determinístico com 5 regras de integridade analítica e monotonicidade matemática de projeções (Q1 e Full Game), sandbox de staging com diff viewer lado a lado e Render Sentinel anti-cold start.',
  'ops.feat1': 'Arquitetura ultra-leve: .NET 10 + Photino.NET + React 19 + Vite 8 (<80MB RAM)',
  'ops.feat2': 'DatabaseValidator: validação estrita de monotonicidade acumulada (Q1 ≤ Q2 ≤ Q3 ≤ Q4)',
  'ops.feat3': 'Repositório local em SQLite WAL + auditoria analítica sobre MongoDB Atlas',
  'ops.feat4': 'Render Sentinel: monitoramento de CPU/RAM com keepalive e bypass de Cloudflare edge-cache',
  'ops.badge': 'Torre de Controle · Governança de Dados',

  'vol2.tag': 'Volume 02 · Arquitetura e Decisões',
  'vol2.title': 'System Design COSTAR Decisório',
  'vol2.desc': 'Workbench interativo para declarar trade-offs de latência/throughput, simular o Teorema CAP e exportar ADRs em Markdown versionável.',
  'vol2.feat1': 'Simulador visual do Teorema CAP',
  'vol2.feat2': 'Matriz de priorização Pareto 20/80',
  'vol2.feat3': 'Gerador de ADR Markdown para /docs/adr/',
  'vol2.btn': 'Abrir Workbench ⟶',

  // Projetos Selecionados
  'proj1.title': 'Arquitetura Web de Alta Performance',
  'proj1.desc': 'Aplicações web sem frameworks pesados, com Core Web Vitals no percentil 99, CSS com Cascade Layers e renderização ultra-rápida.',
  'proj1.tag': 'Frontend Puro · Zero Runtime',
  'proj2.title': 'Design de Sistemas e Microsserviços',
  'proj2.desc': 'Modelagem orientada a domínio (DDD), isolamento por bounded contexts, estratégias de mensageria assíncrona e resiliência.',
  'proj2.tag': 'Arquitetura · DDD · Microservices',
  'proj3.title': 'DevOps e Infraestrutura Local Imutável',
  'proj3.desc': 'Provisionamento com OpenTofu/Terraform, pipelines CI/CD automatizados no GitHub Actions e ambientes locais via Docker Compose.',
  'proj3.tag': 'Docker · CI/CD · IaC',

  // Minha História (Timeline)
  'story.step1_year': 'Fundação e Excelência Web',
  'story.step1_title': 'Domínio de Padrões e Algoritmos',
  'story.step1_desc': 'Início focado em algoritmos, estruturas de dados e domínio profundo das especificações do W3C/ECMA. Construção de aplicações leves, acessíveis e centradas na experiência do usuário.',

  'story.step2_year': 'Engenharia de Escala e Arquitetura',
  'story.step2_title': 'Sistemas Distribuídos e Resiliência',
  'story.step2_desc': 'Atuação em cenários de alta volumetria, desacoplamento de monolitos, modelagem DDD, pipelines de dados assíncronos e governança técnica orientada a ADRs.',

  'story.step3_year': 'Presente e Suíte COSTAR',
  'story.step3_title': 'Liderança Técnica e Ferramentas Decisórias',
  'story.step3_desc': 'Criação de ecossistemas e frameworks conceituais que reduzem o custo de decisão arquitetural, promovendo excelência de Clean Code e alinhamento entre produto e engenharia.',

  // Fale Conosco
  'contact.title': 'Vamos Construir Software de Alto Impacto?',
  'contact.desc': 'Seja para propor uma oportunidade, debater arquitetura de sistemas ou colaborar em projetos práticos, monte sua mensagem abaixo:',
  'contact.label_tags': 'Selecione o Assunto Rápido:',
  'contact.tag_job': 'Proposta / Vaga',
  'contact.tag_project': 'Projeto / Freelance',
  'contact.tag_advisory': 'Consultoria',
  'contact.tag_chat': 'Bate-papo Dev',
  'contact.tag_other': 'Outro Assunto',
  'contact.label_subject': 'Assunto Selecionado (Automático):',
  'contact.label_email': 'Seu E-mail (para resposta):',
  'contact.label_message': 'Sua Mensagem:',
  'contact.placeholder_message': 'Descreva brevemente o projeto, escopo ou oportunidade técnica...',
  'contact.btn_send': 'Enviar Mensagem Direta ⟶',
  'contact.btn_send_email': 'Enviar Mensagem Direta',
  'contact.sending': 'Enviando mensagem...',
  'contact.success': '✓ Mensagem enviada com sucesso! Responderei em breve.',
  'contact.error': '✕ Erro ao enviar mensagem. Tente novamente ou use o e-mail direto.',
  'contact.direct_label': 'Ou conecte-se diretamente:',
  'contact.email_label': 'E-mail Principal',
  'contact.btn_copy_email': 'Copiar E-mail',
  'contact.email_copied': '✓ E-mail Copiado!',
  'contact.btn_email_direct': 'Enviar Mensagem Direta ⟶',
  'contact.social_github': 'GitHub',
  'contact.social_linkedin': 'LinkedIn',
  'contact.sla': 'Resposta garantida',
  'conn.github_desc': 'Repositórios open-source, testes automatizados, arquitetura de software e implementações práticas.',
  'conn.linkedin_desc': 'Trajetória profissional, liderança técnica, publicações de engenharia, recomendações e networking.',

  // ─── Home Hub: Modo Dev (Opção 2 · Terminal CLI) ───
  'terminal.header_title': 'pvduk@dev-station:~ (zsh) — 80x24',
  'terminal.welcome': 'Bem-vindo ao terminal interativo de pvduk. Digite um comando ou clique nos atalhos acima:',
  'terminal.chip_whoami': '$ whoami',
  'terminal.chip_projects': '$ ls projects/',
  'terminal.chip_story': '$ cat story.log',
  'terminal.chip_contact': '$ ./contact.sh',
  'terminal.chip_costar': '$ costar --status',
  'terminal.chip_clear': '$ clear',
  'terminal.placeholder': 'Digite um comando (ex: help, whoami, projects, story, contact, clear)...',

  // Terminal: whoami
  'terminal.whoami_title': 'pvduk · Senior Software Engineer e FullStack C#/React',
  'terminal.whoami_desc': 'Especialista em arquitetura limpa, sistemas distribuídos, performance web e desenvolvimento frontend puro.',
  'terminal.whoami_tag_ts': 'TypeScript / Vanilla ES2026',
  'terminal.whoami_tag_clean': 'Clean Architecture e DDD',
  'terminal.whoami_tag_perf': 'Web Standards e CWV',
  'terminal.whoami_tag_docker': 'IaC e Docker',
  'terminal.whoami_tag_sd': 'System Design',
  'terminal.whoami_tag_avalonia': 'Avalonia UI',
  'terminal.whoami_tag_db': 'SQL e NoSQL',
  'terminal.whoami_status': '● Status: Disponível para projetos e consultoria técnica',

  // Terminal: help
  'terminal.help_title': 'COMANDOS DISPONÍVEIS:',
  'terminal.help_whoami': 'Exibe perfil e especialidades técnicas',
  'terminal.help_projects': 'Lista projetos e artefatos de engenharia',
  'terminal.help_story': 'Linha do tempo de carreira e marcos profissionais',
  'terminal.help_contact': 'Canais diretos de contato e e-mail',
  'terminal.help_costar': 'Status e links do Framework COSTAR',
  'terminal.help_theme': 'Alterna tema Dark / Light',
  'terminal.help_lang': 'Alterna idioma PT / EN',
  'terminal.help_clear': 'Limpa o console do terminal',

  // Terminal: projects
  'terminal.projects_title': '[ARTEFATOS E PROJETOS]',
  'terminal.th_name': 'NOME',
  'terminal.th_stack': 'STACK',
  'terminal.th_type': 'TIPO',
  'terminal.th_link': 'ACESSO',
  'terminal.proj_fs_name': 'FirstStrike Analytics 🏀⚡',
  'terminal.proj_fs_stack': '.NET 10 / React 19 / Tailwind v4 / MongoDB / Gemini IA',
  'terminal.proj_fs_type': 'SaaS Quantitativo e IA (NBA)',
  'terminal.proj_fs_link': '[firststrikeanalytics.com.br] ↗',
  'terminal.proj_planexa_name': 'Planexa OS 💎⚡',
  'terminal.proj_planexa_stack': '.NET 10 / Photino.NET / React 19 / SQLite WAL',
  'terminal.proj_planexa_type': 'Desktop Nativo (Offline-First)',
  'terminal.proj_planexa_status': 'Desktop Nativo',
  'terminal.proj_ops_name': 'FirstStrike Ops 🛡️',
  'terminal.proj_ops_stack': '.NET 10 / Photino.NET / SQLite / MongoDB Atlas',
  'terminal.proj_ops_type': 'Torre de Controle e Observabilidade',
  'terminal.proj_ops_status': 'Auditoria e Operações',
  'terminal.proj1_name': '01 · Roadmap de Requisitos',
  'terminal.proj1_stack': 'HTML5 / Vanilla JS / C# .NET 10 / MongoDB NoSQL',
  'terminal.proj1_type': 'Processo e Estudo de Caso',
  'terminal.proj1_link': '[Acessar] ➔',
  'terminal.proj2_name': 'Web Perf e Zero-Runtime',
  'terminal.proj2_stack': 'CSS Cascade Layers / ES2026',
  'terminal.proj2_type': 'Kit de Arquitetura',
  'terminal.proj2_status': 'Produção',
  'terminal.proj3_name': 'Clean Architecture e DDD',
  'terminal.proj3_stack': 'C# .NET 10 / MongoDB / Docker',
  'terminal.proj3_type': 'Boilerplate de Padrões',
  'terminal.proj3_status': 'Produção',

  // Terminal: story
  'terminal.story_title': '[LOG DE CARREIRA E MARCOS DE ENGENHARIA]',
  'terminal.story_m3_role': 'Presente:',
  'terminal.story_m3_desc': 'Liderança Técnica e Suíte Decisória COSTAR',
  'terminal.story_m2_role': 'Engenharia de Escala:',
  'terminal.story_m2_desc': 'Sistemas Distribuídos, DDD, Resiliência e Microsserviços',
  'terminal.story_m1_role': 'Fundação:',
  'terminal.story_m1_desc': 'Algoritmos, W3C Standards, Vanilla Web e Performance',

  // Terminal: contact
  'terminal.contact_title': '[CANAIS DE CONTATO]',
  'terminal.contact_desc': 'Pronto para colaborar em projetos de alto impacto e consultoria técnica:',
  'terminal.contact_email_label': 'E-mail:',
  'terminal.contact_copy_btn': '[Copiar]',
  'terminal.contact_copied': '✓ E-mail Copiado!',
  'terminal.contact_github_label': 'GitHub:',
  'terminal.contact_linkedin_label': 'LinkedIn:',
  'terminal.contact_sla': '● Tempo de resposta: < 24h úteis',

  // Terminal: costar
  'terminal.costar_title': '[FRAMEWORK COSTAR · STATUS REPORT]',
  'terminal.costar_item1': '01 · Roadmap de Requisitos:',
  'terminal.costar_status1': '[ATIVO / OPERACIONAL] ➔',

  // Terminal: feedback
  'terminal.theme_changed': '✓ Tema alterado com sucesso.',
  'terminal.lang_changed': '✓ Idioma alterado para Inglês.',

  // ─── Volume 01: Roadmap ───
  'roadmap.header_eyebrow': '// Estudo de Caso de Engenharia de Software · C# .NET e Clean Architecture',
  'roadmap.header_title': 'Roadmap de Engenharia de Software',
  'roadmap.header_sub': 'Do Discovery ao Deploy em Produção: Como atacamos o problema de latência analítica no FirstStrike Analytics com C# .NET e Clean Architecture',
  'roadmap.case_overview_title': 'Visão Geral do Caso: Plataforma Analítica SaaS',
  'roadmap.case_overview_text': 'Este estudo de caso documenta as decisões arquiteturais e os fundamentos de engenharia aplicados na construção do FirstStrike Analytics, um SaaS de alta performance. Demonstra como um problema de alto custo computacional e concorrência foi resolvido através de Clean Architecture, processamento assíncrono em segundo plano (Zero-Compute no client), C# .NET 10, cacheamento inteligente na borda e testes automatizados em múltiplas camadas.',
  'roadmap.costar_title': 'Framework COSTAR · Estratégia de Engenharia',
  'roadmap.phases_title': 'Roadmap de Engenharia · 8 Fases do Projeto',
  'roadmap.timeline_title': 'Linha do Tempo de Engenharia e Entregáveis',
  'roadmap.progress_text': 'fases abertas',

  'roadmap.p0_title': 'Fase 00 · Discovery e Alinhamento da Dor de Negócio',
  'roadmap.p0_desc': 'Onde o produto ataca a dor real do usuário antes de qualquer linha de código',
  'roadmap.p1_title': 'Fase 01 · Atores, Fronteiras e Diagrama C4 de Contexto',
  'roadmap.p1_desc': 'Mapeamento de atores, serviços externos e fluxo macro do sistema',
  'roadmap.p2_title': 'Fase 02 · Requisitos Funcionais, MoSCoW e BDD Gherkin',
  'roadmap.p2_desc': 'Especificação precisa com critérios de aceite testáveis e priorização clara',
  'roadmap.p3_title': 'Fase 03 · Modelagem de Domínio (DDD) e Persistência NoSQL',
  'roadmap.p3_desc': 'Linguagem ubíqua, aggregate roots e persistência atômica de alta performance',
  'roadmap.p4_title': 'Fase 04 · Decisões de Arquitetura em C# .NET e ADRs',
  'roadmap.p4_desc': 'Clean Architecture em 4 camadas, desacoplamento assíncrono e resiliência',
  'roadmap.p5_title': 'Fase 05 · Segurança, Rate Limiting e Edge Caching (RFC-7234)',
  'roadmap.p5_desc': 'Proteção de borda, controle de abuso e entrega acelerada via CDN',
  'roadmap.p6_title': 'Fase 06 · Stack Tecnológica e Docker Multi-Container',
  'roadmap.p6_desc': 'Ambiente 100% reproduzível com Hot Reload e controle rigoroso de recursos',
  'roadmap.p7_title': 'Fase 07 · Contratos de API e Qualidade de Software',
  'roadmap.p7_desc': 'Design formal de contratos de API e garantia de qualidade em 3 camadas de testes',
  'roadmap.p8_title': 'Fase 08 · Gate de Qualidade e Entrada em Produção',
  'roadmap.p8_desc': 'Checklist de prontidão técnica aprovado e operação contínua com alta performance',

  // COSTAR Framework
  'roadmap.costar_c_label': 'Contexto',
  'roadmap.costar_c_text': 'O processamento síncrono de modelos estatísticos e chamadas de IA sob demanda gerava alto tempo de resposta (TTFB > 2s), sobrecarga de CPU no servidor e risco de estouro de cotas de APIs externas.',
  'roadmap.costar_o_label': 'Objetivo',
  'roadmap.costar_o_text': 'Garantir tempo de resposta sub-35ms para o usuário final, desacoplar 100% da computação pesada para background workers e blindar o backend contra picos de tráfego.',
  'roadmap.costar_s_label': 'Style',
  'roadmap.costar_s_text': 'Estudo de caso focado em fundamentos de engenharia: trade-offs arquiteturais, padrões de resiliência e boas práticas de código limpo.',
  'roadmap.costar_t_label': 'Tom',
  'roadmap.costar_t_text': 'Técnico, objetivo e orientado a resultados de engenharia de software (DDD, SOLID, concorrência e alta disponibilidade).',
  'roadmap.costar_a_label': 'Audiência',
  'roadmap.costar_a_text': 'Tech Leads, Arquitetos de Software, Engenheiros e Recrutadores Técnicos avaliando maturidade de design e execução.',
  'roadmap.costar_r_label': 'Resposta',
  'roadmap.costar_r_text': '8 fases estruturadas demonstrando a evolução desde a análise da dor do usuário até a entrada em produção contínua.',

  // Fase 00
  'roadmap.p0_tag1': 'Problema Validado',
  'roadmap.p0_tag2': '1–3 dias',
  'roadmap.p0_b1_title': 'O Problema e a Causa Raiz',
  'roadmap.p0_b1_item1': '<strong>A Dor do Usuário:</strong> Tomada de decisão baseada em métricas estáticas e agregadas, ignorando a volatilidade temporal e a dispersão dos dados.',
  'roadmap.p0_b1_item2': '<strong>Inconsistência Analítica:</strong> Plataformas existentes calculam projeções de forma síncrona e lenta, ou fornecem visões genéricas sem granularidade.',
  'roadmap.p0_b1_item3': '<strong>Fundamento Aplicado:</strong> Análise de Causa Raiz (5 Porquês) para mapear o comportamento do usuário e isolar o escopo essencial do MVP.',
  'roadmap.p0_b1_item4': '<strong>Abordagem Técnica:</strong> Arquitetura orientada a processamento em lote em background, eliminando cálculos pesados da experiência de navegação.',
  'roadmap.p0_b2_title': 'Critérios de Sucesso e KPIs de Engenharia',
  'roadmap.p0_b2_item1': '<strong>Latência no Client:</strong> Servir visualizações e dados em menos de 35ms a partir da borda.',
  'roadmap.p0_b2_item2': '<strong>Carga no Servidor:</strong> Zero custo computacional pesado acionado por cliques de leitura do usuário.',
  'roadmap.p0_b2_item3': '<strong>Atualização Contínua:</strong> Pipeline assíncrono mantendo dados e status de contexto sempre sincronizados.',
  'roadmap.p0_b2_item4': '<strong>Resiliência de Integração:</strong> 100% de disponibilidade de pareceres mesmo sob instabilidade em serviços externos.',
  'roadmap.p0_artifact': '<strong>Artefato Entregue na Fase 00:</strong> <em>Documento de Visão de Produto e Escopo Técnico</em>, formalizando a arquitetura assíncrona orientada a eventos para mitigar o gargalo de latência na experiência do usuário.',

  // Fase 01
  'roadmap.p1_tag1': 'C4 Nível 1',
  'roadmap.p1_tag2': '2–4 dias',
  'roadmap.p1_b1_title': 'Atores e Papéis',
  'roadmap.p1_b1_item1': '<strong>Usuário Final (Web / PWA):</strong> Navega por dados consolidados, aplica filtros e consome resumos analíticos em tempo real.',
  'roadmap.p1_b1_item2': '<strong>Hosted Background Workers:</strong> Processos assíncronos autônomos que realizam tarefas periódicas de ingestão e modelagem.',
  'roadmap.p1_b1_item3': '<strong>Serviços Externos:</strong> APIs de dados brutos e provedores de IA integrados com camadas de proteção e contingência.',
  'roadmap.p1_b2_title': 'Fundamentos de Integração',
  'roadmap.p1_b2_item1': '<strong>Isolamento de Responsabilidades:</strong> O cliente web nunca se comunica diretamente com serviços externos lentos.',
  'roadmap.p1_b2_item2': '<strong>Topologia Desacoplada:</strong> O backend centraliza a persistência atômica, servindo dados prontos para a camada de borda.',
  'roadmap.p1_b2_item3': '<strong>Comunicação Resiliente:</strong> Circuit breakers e retries automáticos com backoff exponencial.',
  'roadmap.p1_c4_title': 'Diagrama C4 Nível 1 · Fluxo Arquitetural do Sistema',
  'roadmap.p1_c4_diagram': '[ Usuário / Cliente ] ──(HTTPS/PWA)──> [ Serviço Front / Edge CDN ] ──(Cache Miss)──> [ Backend API (C# .NET) ]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Leituras O(1))<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>[ Feeds Externos de Dados ] ──> [ Background Hosted Workers (.NET) ] ──(Write)──> [ Banco de Dados NoSQL ] <──(Read)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Assíncrono)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ Provedores de IA Generativa ]',

  // Fase 02
  'roadmap.p2_tag1': 'Gherkin BDD',
  'roadmap.p2_tag2': '3–5 dias',
  'roadmap.p2_spec_title': 'Especificação Comportamental em Gherkin',
  'roadmap.p2_spec_content': '<strong class="text-accent3">História: Consulta Analítica com Resposta de Baixa Latência</strong><br><em>Como um</em> analista ou usuário da plataforma<br><em>Quero</em> acessar os relatórios e métricas consolidadas da rodada<br><em>Para</em> obter insumos decisórios instantâneos sem aguardar reprocessamento de cálculos pesados.<br><br><strong class="text-green">Cenário BDD: Resposta Otimizada a Partir da Camada Consolidada</strong><br><strong>Given (Dado)</strong> que o pipeline assíncrono de background concluiu a geração das análises diárias<br><strong>When (Quando)</strong> eu solicito os dados consolidados pelo dashboard ou API<br><strong>Then (Então)</strong> o sistema deve retornar as projeções e resumos em menos de 35ms<br><strong>And (E)</strong> nenhuma computação estatística pesada deve ser executada de forma síncrona na thread da requisição.',
  'roadmap.p2_moscow_title': 'Priorização de Escopo (MoSCoW)',
  'roadmap.p2_moscow_must': '<strong>Must Have:</strong> Processamento em lote em background, persistência atômica, cache na borda e suporte PWA.',
  'roadmap.p2_moscow_should': '<strong>Should Have:</strong> Filtros temporais otimizados, internacionalização fluida e fallback resiliente de serviços externos.',
  'roadmap.p2_moscow_could': '<strong>Could Have:</strong> Alertas push/webhooks e integrações avançadas com provedores terceiros.',
  'roadmap.p2_moscow_wont': '<strong>Won\'t Have:</strong> Operações de liquidação financeira ou chat síncrono no MVP.',
  'roadmap.p2_nfr_title': 'Requisitos Não-Funcionais',
  'roadmap.p2_nfr_item1': '<strong>Performance:</strong> Time to First Byte (TTFB) < 35ms para rotas de leitura em cache.',
  'roadmap.p2_nfr_item2': '<strong>Eficiência de Recursos:</strong> Backend enxuto com baixo footprint de memória e CPU.',
  'roadmap.p2_nfr_item3': '<strong>Alta Disponibilidade:</strong> Resiliência a falhas parciais em integrações externas.',

  // Fase 03
  'roadmap.p3_tag1': 'DDD e NoSQL',
  'roadmap.p3_tag2': '3–6 dias',
  'roadmap.p3_b1_title': 'O Problema e os Fundamentos DDD',
  'roadmap.p3_b1_item1': '<strong>O Problema:</strong> Modelos relacionais altamente normalizados exigiam múltiplos JOINs sob alta concorrência de leitura, degradando o tempo de resposta.',
  'roadmap.p3_b1_item2': '<strong>Fundamento Aplicado:</strong> Domain-Driven Design (DDD) com Aggregate Roots auto-contidos e consistência eventual.',
  'roadmap.p3_b1_item3': '<strong>Decisão de Modelagem:</strong> Estruturar agregados que consolidam metadados, métricas e análises pré-calculadas em um único documento atômico.',
  'roadmap.p3_b1_item4': '<strong>Benefício:</strong> Leituras em tempo O(1) diretamente indexadas, eliminando consultas N+1.',
  'roadmap.p3_b2_title': 'Bounded Contexts e Índices',
  'roadmap.p3_b2_item1': '<strong>Contexto de Ingestão:</strong> Coleta e saneamento de dados de fontes externas.',
  'roadmap.p3_b2_item2': '<strong>Contexto Analítico:</strong> Execução de modelos estatísticos e agregações em lote.',
  'roadmap.p3_b2_item3': '<strong>Contexto de Consulta:</strong> Resolução rápida de queries com índices compostos estratégicos.',
  'roadmap.p3_b2_item4': '<strong>Idempotência:</strong> Provisionamento automático de índices na inicialização do serviço.',
  'roadmap.p3_artifact': '<strong>Artefato Entregue na Fase 03:</strong> <em>Modelo de Domínio em C# e Mapeamento de Persistência NoSQL</em>, consolidando agregados de leitura atômica sem sobrecarga relacional.',

  // Fase 04
  'roadmap.p4_tag1': 'Clean Architecture (.NET)',
  'roadmap.p4_tag2': '4–7 dias',
  'roadmap.p4_adr1_title': 'ADR #001 · Clean Architecture com Desacoplamento Zero-Compute em Background (.NET 10)',
  'roadmap.p4_adr1_content': '<strong class="text-orange">Status:</strong> APROVADO E IMPLEMENTADO<br><strong class="text-blue">Contexto:</strong> Cálculos matemáticos estocásticos e requisições para LLMs possuem tempo de execução imprevisível (800ms a 3s). Bloquear requisições HTTP síncronas degradaria a experiência do usuário e saturaria o pool de threads do servidor.<br><strong class="text-green">Decisão:</strong> Adotar <strong>Clean Architecture</strong> em C# (.NET 10) com separação estrita de camadas (<em>Domain, Application, Infrastructure, WebApi</em>) e padrão CQRS (MediatR). 100% das tarefas pesadas foram movidas para <code class="inline-code">HostedService</code> de background. As rotas HTTP realizam apenas leituras em O(1) de documentos consolidados.<br><strong class="text-amber">Consequências:</strong> Resposta instantânea da API, separação clara de responsabilidades, previsibilidade de consumo de CPU e facilidade de manutenção e testes.',
  'roadmap.p4_adr2_title': 'ADR #002 · Cadeia de Resiliência e Fallback para Serviços Externos',
  'roadmap.p4_adr2_content': '<strong class="text-orange">Status:</strong> APROVADO E IMPLEMENTADO<br><strong class="text-blue">Contexto:</strong> Serviços de IA e APIs externas de dados podem apresentar instabilidade pontual, picos de latência ou rate limiting (HTTP 429).<br><strong class="text-green">Decisão:</strong> Implementar uma <strong>Cadeia de Contingência Resiliente</strong> no adaptador de infraestrutura, com fallback automático em cascata entre múltiplos modelos e estratégias de cache.<br><strong class="text-amber">Consequências:</strong> Garantia de continuidade de serviço para o usuário final, com degradação suave e logs transparentes de chaveamento.',

  // Fase 05
  'roadmap.p5_tag1': 'RFC-7234 + Segurança',
  'roadmap.p5_tag2': '3–5 dias',
  'roadmap.p5_b1_title': 'Proteção e Defesa em Profundidade',
  'roadmap.p5_b1_item1': '<strong>Rate Limiting no ASP.NET Core:</strong> Middleware com limite de taxa por IP para evitar abusos e scraping automatizado.',
  'roadmap.p5_b1_item2': '<strong>Autenticação de Origem:</strong> Validação de requisições de clientes autorizados via headers criptográficos.',
  'roadmap.p5_b1_item3': '<strong>Gestão Segura de Configurações:</strong> Segredos e credenciais isolados do repositório e injetados via variáveis de ambiente em runtime.',
  'roadmap.p5_b2_title': 'Estratégia de Cacheamento na Borda',
  'roadmap.p5_b2_item1': '<strong>Headers Declarativos:</strong> Utilização do padrão <code class="inline-code">stale-while-revalidate</code> na camada de controllers.',
  'roadmap.p5_b2_item2': '<strong>Desafogamento do Backend:</strong> Requisições subsequentes são atendidas pela CDN global, reduzindo hits ao banco.',
  'roadmap.p5_b2_item3': '<strong>Sanitização de Payload:</strong> Filtros de saída garantem que apenas dados pertinentes ao estado atual sejam expostos.',

  // Fase 06
  'roadmap.p6_tag1': 'Docker Compose',
  'roadmap.p6_tag2': '3–5 dias',
  'roadmap.p6_b1_title': 'Stack de Produção Selecionada',
  'roadmap.p6_b1_item1': '<strong>Backend:</strong> C# .NET 10 (ASP.NET Core Web API, MediatR, Hosted Services).',
  'roadmap.p6_b1_item2': '<strong>Frontend:</strong> React 19, TypeScript, Vite, Tailwind CSS e PWA Standalone.',
  'roadmap.p6_b1_item3': '<strong>Banco de Dados:</strong> MongoDB (NoSQL atômico com índices compostos).',
  'roadmap.p6_b1_item4': '<strong>Borda e Deploy:</strong> Edge CDN com cacheamento HTTP RFC-7234.',
  'roadmap.p6_b2_title': 'Fundamentos de Containerização',
  'roadmap.p6_b2_item1': '<strong>Isolamento de Recursos:</strong> Limites explícitos de memória (<code class="inline-code">mem_limit</code>) configurados para cada serviço.',
  'roadmap.p6_b2_item2': '<strong>Produtividade com Hot Reload:</strong> Bind mounts e watchers otimizados para compilação contínua em C# e Frontend.',
  'roadmap.p6_b2_item3': '<strong>Healthchecks Ativos:</strong> Serviços aguardam prontidão dos bancos antes de iniciar a inicialização da aplicação.',
  'roadmap.p6_artifact': '<strong>Artefato Entregue na Fase 06:</strong> <em>Orquestração Docker Compose Multi-Container</em>, garantindo paridade total entre ambiente local e produção com subida de 1 comando.',

  // Fase 07
  'roadmap.p7_tag1': 'Testes e OpenAPI',
  'roadmap.p7_tag2': '2–3 dias',
  'roadmap.p7_b1_title': 'Estratégia de Contratos e Testes Automatizados',
  'roadmap.p7_b1_item1': '<strong>Contratos de Interface (OpenAPI 3.0 / Swagger):</strong> Rotas padronizadas para consulta de datas, agregados de partidas, simulações e status do sistema.',
  'roadmap.p7_b1_item2': '<strong>Testes Unitários e de Domínio (C# .NET xUnit):</strong> Cobertura extensiva de regras de negócio, cálculos matemáticos e resiliência de fallback.',
  'roadmap.p7_b1_item3': '<strong>Testes de Componentes e Hooks (Frontend Vitest):</strong> Validação de renderização, gerenciamento de estado global e compatibilidade PWA.',
  'roadmap.p7_b1_item4': '<strong>Testes End-to-End BDD (Playwright):</strong> Simulação da jornada real do usuário cobrindo primeiro acesso, navegação e filtros.',

  // Fase 08
  'roadmap.p8_tag1': 'Live in Production',
  'roadmap.p8_tag2': '1–2 dias',
  'roadmap.p8_gate_title': 'Status do Gate de Entrada em Produção',
  'roadmap.p8_col1_title': '✓ FUNDAMENTOS E BACKEND (100%)',
  'roadmap.p8_col1_item1': 'Clean Architecture em C# .NET 10 implementada',
  'roadmap.p8_col1_item2': 'Desacoplamento Zero-Compute em Background Workers',
  'roadmap.p8_col1_item3': 'Persistência NoSQL atômica em tempo O(1)',
  'roadmap.p8_col1_item4': '100% da suíte de testes xUnit aprovada',
  'roadmap.p8_col2_title': '✓ FRONTEND E PERFORMANCE (100%)',
  'roadmap.p8_col2_item1': 'Edge Caching com TTFB sub-35ms',
  'roadmap.p8_col2_item2': 'Stale-while-revalidate RFC-7234',
  'roadmap.p8_col2_item3': 'PWA com modo Offline First nativo',
  'roadmap.p8_col2_item4': 'Core Web Vitals em faixa verde (100/100)',
  'roadmap.p8_col3_title': '✓ QUALIDADE E RESILIÊNCIA (100%)',
  'roadmap.p8_col3_item1': 'Contratos OpenAPI 3.0 documentados',
  'roadmap.p8_col3_item2': 'Fallback em cascata entre LLMs',
  'roadmap.p8_col3_item3': 'Testes E2E cobrindo 100% dos fluxos BDD',
  'roadmap.p8_col3_item4': 'Docker Multi-Container reproduzível',
  'roadmap.p8_verdict': '<strong>Veredito do Gate: [LIVE IN PRODUCTION]</strong> A plataforma foi homologada e está operando em produção contínua. Os workers assíncronos em C# .NET realizam o processamento prévio dos dados, entregando uma experiência instantânea e estável para o usuário final com custo operacional enxuto.',

  // Linha do Tempo
  'roadmap.tline1_title': 'Semana 1 · Discovery e Modelagem da Solução',
  'roadmap.tline1_desc': 'Análise de Causa Raiz da dor de negócio · Definição de KPIs de Engenharia · Estratégia de Processamento Assíncrono',
  'roadmap.tline2_title': 'Semana 2 · Domínio DDD e Persistência NoSQL',
  'roadmap.tline2_desc': 'Modelagem de Agregados Atômicos em C# · Eliminação de queries N+1 · Índices compostos e leitura em O(1)',
  'roadmap.tline3_title': 'Semana 3 · Clean Architecture e Hosted Workers (.NET 10)',
  'roadmap.tline3_desc': 'ADR #001 Desacoplamento Zero-Compute · ADR #002 Cadeia de Resiliência de IA · Ingestão e Processamento em Background',
  'roadmap.tline4_title': 'Semana 4 · Frontend Moderno, Edge Caching e Testes',
  'roadmap.tline4_desc': 'React 19 + PWA · Headers de Cache RFC-7234 (stale-while-revalidate) · Suíte de Testes Automatizados (xUnit, Vitest, E2E)',
  'roadmap.tline5_title': 'Produção · Live in Production',
  'roadmap.tline5_desc': 'Plataforma operando em produção com alta disponibilidade, custo otimizado e resposta instantânea para o usuário.',

  // Footer Progress Bar
  'roadmap.progress_footer_label': 'COSTAR · Roadmap de Engenharia de Software (Estudo de Caso SaaS)',

  // ─── Volume 02: System Design ───
  'sd.brand': 'System Design',
  'sd.series': 'vol. 2 / 2',
  'sd.eyebrow': '// COSTAR Decisório · Arquitetura de Software',
  'sd.title': 'Pre-processing de<br><em>Decisões Arquiteturais</em>',
  'sd.desc': 'Um workbench interativo para mapear contexto, declarar trade-offs, aplicar o princípio de Pareto e escolher o padrão arquitetural certo — antes da primeira linha de código.',
  'sd.badge_num': '20%',
  'sd.badge_lbl': 'das decisões →<br>80% do impacto',
  'sd.btn_generate': 'Gerar Resumo Decisório',
  'sd.btn_copy': 'Copiar Markdown',
  'sd.btn_copied': '✓ Copiado!',

  // ─── 404 Error Page ───
  '404.badge': '// FATAL: 0x00000404 · Segment Fault in /dev/null',
  '404.title': '404 · NullReferenceException',
  '404.desc': 'A rota solicitada aponta para uma referência nula na memória ou foi dropada no pipeline de CI/CD.',
  '404.hypo_title': '[ROOT CAUSE ANALYSIS · DIAGNÓSTICO DE ENGENHARIA]',
  '404.hypo_1': 'Hipótese 01: O estagiário deu git push --force na sexta-feira às 18h.',
  '404.hypo_2': 'Hipótese 02: O Garbage Collector coletou esta página por considerá-la unreachable.',
  '404.hypo_3': 'Hipótese 03: Você tentou acessar uma rota sem colocar ponto-e-vírgula no final.',
  '404.btn_home': 'cd /home ➔',
  '404.btn_roadmap': 'git checkout roadmap ➔',
  '404.btn_coffee': '☕ sudo make-coffee',
  '404.coffee_msg': 'HTTP 418: I\'m a teapot · Café expresso provisionado com sucesso na memória cache!',

  // ─── Blog de Engenharia e Artigos ───
  'blog.badge': '// Publicações e Artigos Técnicos',
  'blog.title': 'Blog de Engenharia e Artigos',
  'blog.subtitle': 'Artigos de trincheira sobre Clean Architecture, System Design, performance web e padrões sem dependências pesadas.',
  'blog.all': 'Todas',
  'blog.filter_label': 'Filtrar por Assunto:',
  'blog.empty': 'Nenhum artigo encontrado para a tag selecionada.',
  'blog.error': 'Não foi possível carregar os artigos no momento. Tente recarregar a página.',
  'blog.read_more': 'Ler artigo ⟶',
  'blog.published_at': 'Publicado em',
  'blog.reading_time': 'min de leitura',
  'blog.back': '← Voltar para o Blog',
  'blog.noscript_msg': '⚡ JavaScript desativado. A listagem dinâmica e filtros requerem JavaScript, mas os artigos individuais funcionam perfeitamente no modo estático.',

  // ─── Séries de Artigos ───
  'series.label': 'Série',
  'series.part_of': 'Parte {part} de {total}',
  'series.previous': '← Anterior',
  'series.next': 'Próxima →',
  'series.upcoming': 'em breve',
  'blog.post.series_part': 'Série: {series} · Parte {part} de {total}',
  'blog.post.next': 'Próxima',
  'blog.post.back': 'Voltar ao blog',

  // ─── PWA e Ciclo de Vida ───
  'pwa.update_available': 'Nova versão disponível com melhorias de layout e performance.',
  'pwa.update_btn': 'Atualizar agora',

  // ─── Detalhes do Artigo e Autor ───
  'blog.post.breadcrumbs_home': 'Início',
  'blog.post.breadcrumbs_blog': 'Blog',
  'blog.post.author_role': 'Engenheiro de Software e FullStack C#/React',
  'blog.post.about_author': 'Sobre o Autor',
  'blog.post.about_author_bio': 'Engenheiro de Software e FullStack C#/React especializado em Clean Architecture, Performance Web, DDD e arquitetura sem dependências pesadas.',
  'blog.post.view_roadmap': 'Ver Roadmap SaaS',
  'blog.post.noscript': '⚡ Modo Estático (Sem JavaScript): Este artigo é 100% legível e acessível sem JavaScript. A alternância de temas e recursos interativos requerem JavaScript.'
},
    en: {
  // ─── Topbar and Navigation ───
  'nav.skip_to_content': 'Skip to main content',
  'nav.home': 'Home',
  'nav.roadmap': 'Roadmap',
  'nav.blog': 'Blog',
  'nav.system_design': '02 · System Design',
  'nav.brand': 'pvduk · dev',
  'nav.series': 'Software Engineer',
  'btn.lang': 'EN',
  'btn.theme_toggle': 'Toggle Theme',
  'btn.dev_mode': 'Dev Mode',
  'btn.std_mode': 'Standard Mode',
  'footer.copyright': '© 2026 pvduk.dev · All rights reserved.',
  'footer.author': 'Crafted with Vanilla Web Standards and Clean Architecture.',

  // ─── Home Hub: Standard Mode (Option 1 · The Architectural Engineer) ───
  'hub.author_name': 'Paulo Dukven',
  'hub.badge_status': 'Available for projects and consulting',
  'hub.hero_title': 'Software Engineer and<br><em>FullStack C#/React</em>',
  'hub.hero_tagline': 'Specialized in clean architecture, distributed systems, web performance, and pure frontend engineering.',
  'hub.btn_explore': 'Explore Portfolio ↓',
  'hub.btn_contact': 'Get in Touch ⟶',

  // Technical Disciplines
  'disc.system_design': 'System Design',
  'disc.clean_arch': 'Clean Architecture',
  'disc.web_perf': 'Web Performance (CWV)',
  'disc.avalonia_ui': 'Avalonia UI',
  'disc.sql_nosql': 'SQL and NoSQL',
  'disc.iac_docker': 'IaC and Docker',

  // Sections
  'hub.section_flagship': 'Flagship Project',
  'hub.section_projects': 'Technical Specialties',
  'hub.section_story': 'Project Milestones',
  'hub.section_contact': 'Get in Touch',
  'hub.section_connections': 'Connections',

  // Flagship Project Tabs
  'projects.tab_analytics': 'FirstStrike Analytics',
  'projects.tab_ops': 'FirstStrike Ops',
  'projects.tab_planexa': 'Planexa OS',
  'projects.tab_roadmap': 'Requirements Roadmap',

  // FirstStrike Analytics SaaS
  'analytics.tag': 'Live in Production · AI and Quantitative Modeling · FullStack .NET 10 / React 19',
  'analytics.title': 'FirstStrike Analytics ⚡ · NBA Quantitative Platform',
  'analytics.desc': 'Quantitative analytics engine running 10,000 Monte Carlo simulations per scenario to price NBA player probabilities and expected value (EV+). Architected to eliminate computational latency: heavy background processing (.NET 10 async) with instant React 19 delivery at the edge.',
  'analytics.feat1': 'Dual-Scope Analytics: Specialized statistical modeling for First Quarter and Full Game',
  'analytics.feat2': 'Joint Monte Carlo Engine: 10,000 iterations for joint probabilities and volume cannibalization',
  'analytics.feat3': 'Tactical AI Projections: Contextual insights with automatic Gemini rate-limit fallback chain',
  'analytics.feat4': 'Docker Compose + Universal PWA: .NET 10 backend, React 19 + Tailwind v4 frontend, and MongoDB Atlas',
  'analytics.btn': 'Visit FirstStrike Analytics ↗',
  'analytics.badge': 'Live in Production · firststrikeanalytics.com.br',

  // COSTAR Volumes
  'vol1.tag': 'Flagship Project · Process and Case Study',
  'vol1.title': 'Software Engineering and Requirements Roadmap',
  'vol1.desc': 'Structured 8-phase guide with the real FirstStrike Analytics SaaS case study: from business discovery to the Production Gate.',
  'vol1.feat1': 'Intuitive, simple, and rich case study for any user',
  'vol1.feat2': 'C4 Level 1 diagrams, DDD and NoSQL tables',
  'vol1.feat3': 'Real OpenAPI 3.0 specs and Docker Compose environment',
  'vol1.btn': 'Open Interactive Roadmap ⟶',

  // Planexa OS
  'planexa.tag': 'Native Desktop · Clean Architecture · 100% Offline-First',
  'planexa.title': 'Planexa OS 💎⚡ · Executive Workflow and Native Gantt',
  'planexa.desc': 'High-density native desktop operating system for freelance engineering, academic studies, and management. Reactive Pomodoro integrated with TanStack Query, interactive vector SVG Gantt chart with proportional deadline dilution, TipTap WYSIWYG Markdown matrix editor, and dual workspaces (Professional vs Academic).',
  'planexa.feat1': 'Modern stack: .NET 10 + C# 14 + Photino.NET (Native without Electron, <40MB RAM)',
  'planexa.feat2': 'Reactive frontend: React 19 + TypeScript 5.9 + Tailwind CSS v4 (@theme semantic tokens)',
  'planexa.feat3': 'Transactional local relational persistence in SQLite with runtime schema auto-migration',
  'planexa.feat4': 'Excellence engineering: 146 automated tests (100% passing) and Uncle Bob Quality Gate 98/100',
  'planexa.badge': 'Native Desktop App · 100% Offline',

  // FirstStrike Ops
  'ops.tag': 'Control Tower · Observability · Mathematical Audit',
  'ops.title': 'FirstStrike Ops 🛡️ · Operational Control Tower',
  'ops.desc': 'Real-time operational control tower and observability for the FirstStrike Analytics ecosystem. Deterministic pipeline with 5 analytical integrity and mathematical monotonicity rules for sports projections (Q1 and Full Game), staging sandbox with side-by-side diff viewer, and Render Cloud Sentinel anti-cold start engine.',
  'ops.feat1': 'Ultra-lightweight architecture: .NET 10 + Photino.NET + React 19 + Vite 8 (<80MB RAM)',
  'ops.feat2': 'DatabaseValidator: strict accumulated monotonicity validation (Q1 ≤ Q2 ≤ Q3 ≤ Q4)',
  'ops.feat3': 'Local repository in SQLite WAL + analytical auditing over MongoDB Atlas',
  'ops.feat4': 'Render Sentinel: CPU/RAM telemetry with keepalive and Cloudflare edge-cache bypass',
  'ops.badge': 'Control Tower · Data Governance',

  'vol2.tag': 'Volume 02 · Architecture and Decisions',
  'vol2.title': 'Decisional System Design COSTAR',
  'vol2.desc': 'Interactive workbench to declare latency/throughput trade-offs, simulate CAP Theorem, and export versionable Markdown ADRs.',
  'vol2.feat1': 'Visual CAP Theorem simulator',
  'vol2.feat2': 'Pareto 20/80 prioritization matrix',
  'vol2.feat3': 'Markdown ADR generator for /docs/adr/',
  'vol2.btn': 'Open Workbench ⟶',

  // Selected Projects
  'proj1.title': 'High-Performance Web Architecture',
  'proj1.desc': 'Web applications crafted without heavy frameworks, achieving 99th percentile Core Web Vitals, CSS Cascade Layers, and ultra-fast rendering.',
  'proj1.tag': 'Pure Frontend · Zero Runtime',
  'proj2.title': 'System Design and Microservices',
  'proj2.desc': 'Domain-Driven Design (DDD), bounded context isolation, asynchronous messaging architectures, and distributed system resilience.',
  'proj2.tag': 'Architecture · DDD · Microservices',
  'proj3.title': 'DevOps and Immutable Local Environments',
  'proj3.desc': 'Infrastructure provisioning with OpenTofu/Terraform, automated GitHub Actions CI/CD pipelines, and unified local Docker Compose stacks.',
  'proj3.tag': 'Docker · CI/CD · IaC',

  // My Story (Timeline)
  'story.step1_year': 'Foundations and Web Excellence',
  'story.step1_title': 'Mastery of Standards and Algorithms',
  'story.step1_desc': 'Early career focused on data structures, algorithms, and in-depth mastery of W3C/ECMA standards. Building lightweight, accessible, and user-centric web applications.',

  'story.step2_year': 'Scale Engineering and Architecture',
  'story.step2_title': 'Distributed Systems and Resilience',
  'story.step2_desc': 'Leading high-volume operations, decoupling monolithic architectures, implementing DDD, asynchronous event pipelines, and ADR-driven technical governance.',

  'story.step3_year': 'Present and COSTAR Suite',
  'story.step3_title': 'Technical Leadership and Decision Tools',
  'story.step3_desc': 'Architecting conceptual ecosystems and frameworks that reduce architectural decision costs, elevating Clean Code practices and aligning product with engineering.',

  // Contact
  'contact.title': 'Let’s Build High-Impact Software Together',
  'contact.desc': 'Whether proposing a technical opportunity, discussing system architecture, or collaborating on practical projects, compose your message below:',
  'contact.label_tags': 'Select Quick Subject:',
  'contact.tag_job': 'Proposal / Job',
  'contact.tag_project': 'Project / Freelance',
  'contact.tag_advisory': 'Consulting',
  'contact.tag_chat': 'Dev Chat',
  'contact.tag_other': 'Other Subject',
  'contact.label_subject': 'Selected Subject (Automatic):',
  'contact.label_email': 'Your E-mail (for reply):',
  'contact.label_message': 'Your Message:',
  'contact.placeholder_message': 'Briefly describe your project, technical scope, or opportunity...',
  'contact.btn_send': 'Send Direct Message ⟶',
  'contact.btn_send_email': 'Send Direct Message',
  'contact.sending': 'Sending message...',
  'contact.success': '✓ Message sent successfully! I will reply soon.',
  'contact.error': '✕ Error sending message. Please try again or use direct email.',
  'contact.direct_label': 'Or connect directly:',
  'contact.email_label': 'Primary E-mail',
  'contact.btn_copy_email': 'Copy E-mail',
  'contact.email_copied': '✓ E-mail Copied!',
  'contact.btn_email_direct': 'Send Direct Message ⟶',
  'contact.social_github': 'GitHub',
  'contact.social_linkedin': 'LinkedIn',
  'contact.sla': 'Guaranteed response',
  'conn.github_desc': 'Open-source repositories, automated tests, software architecture, and hands-on implementations.',
  'conn.linkedin_desc': 'Professional trajectory, technical leadership, engineering insights, recommendations, and networking.',

  // ─── Home Hub: Dev Mode (Option 2 · Terminal CLI) ───
  'terminal.header_title': 'pvduk@dev-station:~ (zsh) — 80x24',
  'terminal.welcome': 'Welcome to pvduk interactive terminal. Enter a command or click one of the quick shortcuts below:',
  'terminal.chip_whoami': '$ whoami',
  'terminal.chip_projects': '$ ls projects/',
  'terminal.chip_story': '$ cat story.log',
  'terminal.chip_contact': '$ ./contact.sh',
  'terminal.chip_costar': '$ costar --status',
  'terminal.chip_clear': '$ clear',
  'terminal.placeholder': 'Type a command (e.g., help, whoami, projects, story, contact, clear)...',

  // Terminal: whoami
  'terminal.whoami_title': 'pvduk · Senior Software Engineer and FullStack C#/React',
  'terminal.whoami_desc': 'Specialized in clean architecture, distributed systems, web performance, and pure frontend engineering.',
  'terminal.whoami_tag_ts': 'TypeScript / Vanilla ES2026',
  'terminal.whoami_tag_clean': 'Clean Architecture and DDD',
  'terminal.whoami_tag_perf': 'Web Standards and CWV',
  'terminal.whoami_tag_docker': 'IaC and Docker',
  'terminal.whoami_tag_sd': 'System Design',
  'terminal.whoami_tag_avalonia': 'Avalonia UI',
  'terminal.whoami_tag_db': 'SQL and NoSQL',
  'terminal.whoami_status': '● Status: Available for projects and technical consulting',

  // Terminal: help
  'terminal.help_title': 'AVAILABLE COMMANDS:',
  'terminal.help_whoami': 'Shows developer profile and core skills',
  'terminal.help_projects': 'Lists projects and engineering artifacts',
  'terminal.help_story': 'Career changelog and milestones',
  'terminal.help_contact': 'Direct contact channels and e-mail',
  'terminal.help_costar': 'Status and links of the COSTAR Framework',
  'terminal.help_theme': 'Toggles Dark / Light theme',
  'terminal.help_lang': 'Toggles language PT / EN',
  'terminal.help_clear': 'Clears terminal console',

  // Terminal: projects
  'terminal.projects_title': '[ARTIFACTS AND PROJECTS]',
  'terminal.th_name': 'NAME',
  'terminal.th_stack': 'STACK',
  'terminal.th_type': 'TYPE',
  'terminal.th_link': 'ACCESS',
  'terminal.proj_fs_name': 'FirstStrike Analytics 🏀⚡',
  'terminal.proj_fs_stack': '.NET 10 / React 19 / Tailwind v4 / MongoDB / Gemini AI',
  'terminal.proj_fs_type': 'Quantitative SaaS and AI (NBA)',
  'terminal.proj_fs_link': '[firststrikeanalytics.com.br] ↗',
  'terminal.proj_planexa_name': 'Planexa OS 💎⚡',
  'terminal.proj_planexa_stack': '.NET 10 / Photino.NET / React 19 / SQLite WAL',
  'terminal.proj_planexa_type': 'Native Desktop (Offline-First)',
  'terminal.proj_planexa_status': 'Native Desktop',
  'terminal.proj_ops_name': 'FirstStrike Ops 🛡️',
  'terminal.proj_ops_stack': '.NET 10 / Photino.NET / SQLite / MongoDB Atlas',
  'terminal.proj_ops_type': 'Control Tower and Observability',
  'terminal.proj_ops_status': 'Audit and Operations',
  'terminal.proj1_name': '01 · Requirements Roadmap',
  'terminal.proj1_stack': 'HTML5 / Vanilla JS / C# .NET 10 / MongoDB NoSQL',
  'terminal.proj1_type': 'Process and Case Study',
  'terminal.proj1_link': '[Open] ➔',
  'terminal.proj2_name': 'Web Perf and Zero-Runtime',
  'terminal.proj2_stack': 'CSS Cascade Layers / ES2026',
  'terminal.proj2_type': 'Architecture Kit',
  'terminal.proj2_status': 'Live',
  'terminal.proj3_name': 'Clean Architecture and DDD',
  'terminal.proj3_stack': 'C# .NET 10 / MongoDB / Docker',
  'terminal.proj3_type': 'Pattern Boilerplate',
  'terminal.proj3_status': 'Live',

  // Terminal: story
  'terminal.story_title': '[CAREER LOG AND ENGINEERING MILESTONES]',
  'terminal.story_m3_role': 'Present:',
  'terminal.story_m3_desc': 'Technical Leadership and Decisional COSTAR Suite',
  'terminal.story_m2_role': 'Scale Era:',
  'terminal.story_m2_desc': 'Distributed Systems, DDD, Resilience and Microservices',
  'terminal.story_m1_role': 'Foundations:',
  'terminal.story_m1_desc': 'Algorithms, W3C Standards, Vanilla Web and Performance',

  // Terminal: contact
  'terminal.contact_title': '[CONTACT CHANNELS]',
  'terminal.contact_desc': 'Ready to collaborate on high-impact projects and technical consulting:',
  'terminal.contact_email_label': 'E-mail:',
  'terminal.contact_copy_btn': '[Copy]',
  'terminal.contact_copied': '✓ E-mail Copied!',
  'terminal.contact_github_label': 'GitHub:',
  'terminal.contact_linkedin_label': 'LinkedIn:',
  'terminal.contact_sla': '● Response time: < 24 business hours',

  // Terminal: costar
  'terminal.costar_title': '[COSTAR FRAMEWORK · STATUS REPORT]',
  'terminal.costar_item1': '01 · Requirements Roadmap:',
  'terminal.costar_status1': '[ACTIVE / OPERATIONAL] ➔',

  // Terminal: feedback
  'terminal.theme_changed': '✓ Theme changed successfully.',
  'terminal.lang_changed': '✓ Language changed to Portuguese.',

  // ─── Volume 01: Roadmap ───
  'roadmap.header_eyebrow': '// Software Engineering Case Study · C# .NET and Clean Architecture',
  'roadmap.header_title': 'Software Engineering Roadmap',
  'roadmap.header_sub': 'From Discovery to Production Deploy: How we solved the analytical latency bottleneck in FirstStrike Analytics using C# .NET and Clean Architecture',
  'roadmap.case_overview_title': 'Case Overview: SaaS Analytics Platform',
  'roadmap.case_overview_text': 'This case study documents the architectural decisions and engineering fundamentals applied in building FirstStrike Analytics, a high-performance SaaS. It demonstrates how a high compute cost and concurrency bottleneck was solved through Clean Architecture, asynchronous background workers (Zero-Compute on client), C# .NET 10, intelligent edge caching, and multi-layer automated testing.',
  'roadmap.costar_title': 'COSTAR Framework · Engineering Strategy',
  'roadmap.phases_title': 'Engineering Roadmap · 8 Project Phases',
  'roadmap.timeline_title': 'Engineering Timeline and Deliverables',
  'roadmap.progress_text': 'phases open',

  'roadmap.p0_title': 'Phase 00 · Discovery and Business Pain Alignment',
  'roadmap.p0_desc': 'Where the product tackles the real user pain before any line of code',
  'roadmap.p1_title': 'Phase 01 · Actors, Boundaries and C4 Context Diagram',
  'roadmap.p1_desc': 'Mapping actors, external services and system macro flow',
  'roadmap.p2_title': 'Phase 02 · Functional Requirements, MoSCoW and BDD Gherkin',
  'roadmap.p2_desc': 'Precise specification with testable acceptance criteria and clear prioritization',
  'roadmap.p3_title': 'Phase 03 · Domain-Driven Design (DDD) and NoSQL Persistence',
  'roadmap.p3_desc': 'Ubiquitous language, aggregate roots and high-performance atomic persistence',
  'roadmap.p4_title': 'Phase 04 · C# .NET Architecture Decisions and ADRs',
  'roadmap.p4_desc': '4-Layer Clean Architecture, async decoupling and resilience',
  'roadmap.p5_title': 'Phase 05 · Security, Rate Limiting and Edge Caching (RFC-7234)',
  'roadmap.p5_desc': 'Edge protection, abuse prevention and CDN-accelerated delivery',
  'roadmap.p6_title': 'Phase 06 · Tech Stack and Multi-Container Docker',
  'roadmap.p6_desc': '100% reproducible environment with Hot Reload and strict resource control',
  'roadmap.p7_title': 'Phase 07 · API Contracts and Software Quality',
  'roadmap.p7_desc': 'Formal API contracts design and 3-layer quality assurance tests',
  'roadmap.p8_title': 'Phase 08 · Quality Gate and Production Launch',
  'roadmap.p8_desc': 'Approved technical readiness checklist and continuous high-performance operation',

  // COSTAR Framework
  'roadmap.costar_c_label': 'Context',
  'roadmap.costar_c_text': 'Synchronous processing of statistical models and on-demand AI calls caused high response times (TTFB > 2s), server CPU overload, and the risk of exceeding external API rate limits.',
  'roadmap.costar_o_label': 'Objective',
  'roadmap.costar_o_text': 'Ensure sub-35ms response times for the end user, decouple 100% of heavy computation to background workers, and shield the backend against traffic spikes.',
  'roadmap.costar_s_label': 'Style',
  'roadmap.costar_s_text': 'Case study focused on engineering fundamentals: architectural trade-offs, resilience patterns, and clean code best practices.',
  'roadmap.costar_t_label': 'Tone',
  'roadmap.costar_t_text': 'Technical, objective, and driven by software engineering results (DDD, SOLID, concurrency, and high availability).',
  'roadmap.costar_a_label': 'Audience',
  'roadmap.costar_a_text': 'Tech Leads, Software Architects, Engineers, and Technical Recruiters evaluating design maturity and execution.',
  'roadmap.costar_r_label': 'Response',
  'roadmap.costar_r_text': '8 structured phases demonstrating the evolution from user pain discovery to continuous production launch.',

  // Phase 00
  'roadmap.p0_tag1': 'Validated Problem',
  'roadmap.p0_tag2': '1–3 days',
  'roadmap.p0_b1_title': 'The Problem and Root Cause',
  'roadmap.p0_b1_item1': '<strong>User Pain:</strong> Decision making based on static and aggregated metrics, overlooking temporal volatility and data variance.',
  'roadmap.p0_b1_item2': '<strong>Analytical Inconsistency:</strong> Existing platforms compute projections synchronously and slowly, or provide generic views without granularity.',
  'roadmap.p0_b1_item3': '<strong>Applied Foundation:</strong> Root Cause Analysis (5 Whys) to map user behavior and isolate essential MVP scope.',
  'roadmap.p0_b1_item4': '<strong>Technical Approach:</strong> Background batch-processing architecture, eliminating heavy computation from the browsing experience.',
  'roadmap.p0_b2_title': 'Success Criteria and Engineering KPIs',
  'roadmap.p0_b2_item1': '<strong>Client Latency:</strong> Serve views and data in under 35ms from the edge.',
  'roadmap.p0_b2_item2': '<strong>Server Load:</strong> Zero heavy compute cost triggered by user read requests.',
  'roadmap.p0_b2_item3': '<strong>Continuous Updates:</strong> Asynchronous pipeline keeping data and context status always synchronized.',
  'roadmap.p0_b2_item4': '<strong>Integration Resilience:</strong> 100% insights availability even during external service instability.',
  'roadmap.p0_artifact': '<strong>Artifact Delivered in Phase 00:</strong> <em>Product Vision and Technical Scope Document</em>, formalizing the event-driven async architecture to eliminate the latency bottleneck in the user experience.',

  // Phase 01
  'roadmap.p1_tag1': 'C4 Level 1',
  'roadmap.p1_tag2': '2–4 days',
  'roadmap.p1_b1_title': 'Actors and Roles',
  'roadmap.p1_b1_item1': '<strong>End User (Web / PWA):</strong> Browses consolidated data, applies filters, and consumes real-time analytical summaries.',
  'roadmap.p1_b1_item2': '<strong>Hosted Background Workers:</strong> Autonomous asynchronous processes executing periodic ingestion and modeling tasks.',
  'roadmap.p1_b1_item3': '<strong>External Services:</strong> Raw data APIs and AI providers integrated with protective and fallback layers.',
  'roadmap.p1_b2_title': 'Integration Fundamentals',
  'roadmap.p1_b2_item1': '<strong>Separation of Concerns:</strong> The web client never communicates directly with slow external services.',
  'roadmap.p1_b2_item2': '<strong>Decoupled Topology:</strong> The backend centralizes atomic persistence, serving precomputed data to the edge layer.',
  'roadmap.p1_b2_item3': '<strong>Resilient Communication:</strong> Circuit breakers and automated retries with exponential backoff.',
  'roadmap.p1_c4_title': 'C4 Diagram Level 1 · System Architectural Flow',
  'roadmap.p1_c4_diagram': '[ User / Client ] ──(HTTPS/PWA)──> [ Frontend Service / Edge CDN ] ──(Cache Miss)──> [ Backend API (C# .NET) ]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (O(1) Reads)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>[ External Data Feeds ] ──> [ Background Hosted Workers (.NET) ] ──(Write)──> [ NoSQL Database ] <──(Read)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Asynchronous)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ Generative AI Providers ]',

  // Phase 02
  'roadmap.p2_tag1': 'Gherkin BDD',
  'roadmap.p2_tag2': '3–5 days',
  'roadmap.p2_spec_title': 'Behavioral Specification in Gherkin',
  'roadmap.p2_spec_content': '<strong class="text-accent3">Story: Low-Latency Analytical Query</strong><br><em>As an</em> analyst or platform user<br><em>I want to</em> access consolidated round reports and metrics<br><em>So that</em> I obtain instant decision inputs without waiting for heavy recomputations.<br><br><strong class="text-green">BDD Scenario: Optimized Response from Consolidated Layer</strong><br><strong>Given</strong> that the background asynchronous pipeline completed daily analysis generation<br><strong>When</strong> I request consolidated data via dashboard or API<br><strong>Then</strong> the system must return projections and summaries in under 35ms<br><strong>And</strong> no heavy statistical computation should run synchronously on the request thread.',
  'roadmap.p2_moscow_title': 'Scope Prioritization (MoSCoW)',
  'roadmap.p2_moscow_must': '<strong>Must Have:</strong> Background batch processing, atomic persistence, edge caching, and PWA support.',
  'roadmap.p2_moscow_should': '<strong>Should Have:</strong> Optimized temporal filters, seamless internationalization, and resilient fallback for external services.',
  'roadmap.p2_moscow_could': '<strong>Could Have:</strong> Push alerts/webhooks and advanced third-party provider integrations.',
  'roadmap.p2_moscow_wont': '<strong>Won\'t Have:</strong> Financial settlement operations or synchronous chat in the MVP.',
  'roadmap.p2_nfr_title': 'Non-Functional Requirements',
  'roadmap.p2_nfr_item1': '<strong>Performance:</strong> Time to First Byte (TTFB) < 35ms for cached read routes.',
  'roadmap.p2_nfr_item2': '<strong>Resource Efficiency:</strong> Lean backend with low memory and CPU footprint.',
  'roadmap.p2_nfr_item3': '<strong>High Availability:</strong> Resilience to partial outages in external integrations.',

  // Phase 03
  'roadmap.p3_tag1': 'DDD and NoSQL',
  'roadmap.p3_tag2': '3–6 days',
  'roadmap.p3_b1_title': 'The Problem and DDD Fundamentals',
  'roadmap.p3_b1_item1': '<strong>The Problem:</strong> Highly normalized relational models required multiple JOINs under heavy read concurrency, degrading response times.',
  'roadmap.p3_b1_item2': '<strong>Applied Foundation:</strong> Domain-Driven Design (DDD) with self-contained Aggregate Roots and eventual consistency.',
  'roadmap.p3_b1_item3': '<strong>Modeling Decision:</strong> Structure aggregates that consolidate metadata, metrics, and precomputed analysis into a single atomic document.',
  'roadmap.p3_b1_item4': '<strong>Benefit:</strong> Direct indexed O(1) reads, completely eliminating N+1 queries.',
  'roadmap.p3_b2_title': 'Bounded Contexts and Indexes',
  'roadmap.p3_b2_item1': '<strong>Ingestion Context:</strong> Data harvesting and sanitization from external sources.',
  'roadmap.p3_b2_item2': '<strong>Analytics Context:</strong> Execution of statistical models and batch aggregations.',
  'roadmap.p3_b2_item3': '<strong>Query Context:</strong> Fast query resolution with strategic compound indexes.',
  'roadmap.p3_b2_item4': '<strong>Idempotency:</strong> Automated index provisioning at service startup.',
  'roadmap.p3_artifact': '<strong>Artifact Delivered in Phase 03:</strong> <em>C# Domain Model and NoSQL Persistence Mapping</em>, consolidating atomic read aggregates without relational overhead.',

  // Phase 04
  'roadmap.p4_tag1': 'Clean Architecture (.NET)',
  'roadmap.p4_tag2': '4–7 days',
  'roadmap.p4_adr1_title': 'ADR #001 · Clean Architecture with Zero-Compute Background Decoupling (.NET 10)',
  'roadmap.p4_adr1_content': '<strong class="text-orange">Status:</strong> APPROVED AND IMPLEMENTED<br><strong class="text-blue">Context:</strong> Stochastic mathematical computations and LLM requests exhibit unpredictable execution times (800ms to 3s). Blocking synchronous HTTP requests would degrade user experience and exhaust the server thread pool.<br><strong class="text-green">Decision:</strong> Adopt <strong>Clean Architecture</strong> in C# (.NET 10) with strict layer separation (<em>Domain, Application, Infrastructure, WebApi</em>) and CQRS pattern (MediatR). 100% of heavy tasks moved to background <code class="inline-code">HostedService</code>. HTTP routes perform only O(1) reads on consolidated documents.<br><strong class="text-amber">Consequences:</strong> Instant API response, clear separation of concerns, predictable CPU consumption, and simplified testability.',
  'roadmap.p4_adr2_title': 'ADR #002 · Resilience Chain and Fallback for External Services',
  'roadmap.p4_adr2_content': '<strong class="text-orange">Status:</strong> APPROVED AND IMPLEMENTED<br><strong class="text-blue">Context:</strong> AI services and external data APIs can experience sporadic downtime, latency spikes, or rate limiting (HTTP 429).<br><strong class="text-green">Decision:</strong> Implement a <strong>Resilient Contingency Chain</strong> in the infrastructure adapter, featuring automated cascading fallback across multiple models and cache strategies.<br><strong class="text-amber">Consequences:</strong> Guaranteed service continuity for the end user, graceful degradation, and transparent failover logging.',

  // Phase 05
  'roadmap.p5_tag1': 'RFC-7234 + Security',
  'roadmap.p5_tag2': '3–5 days',
  'roadmap.p5_b1_title': 'Protection and Defense in Depth',
  'roadmap.p5_b1_item1': '<strong>Rate Limiting in ASP.NET Core:</strong> IP rate limiting middleware to prevent abuse and automated scraping.',
  'roadmap.p5_b1_item2': '<strong>Origin Authentication:</strong> Verification of authorized client requests through cryptographic headers.',
  'roadmap.p5_b1_item3': '<strong>Secure Configuration Management:</strong> Secrets and credentials isolated from the repository and injected via environment variables at runtime.',
  'roadmap.p5_b2_title': 'Edge Caching Strategy',
  'roadmap.p5_b2_item1': '<strong>Declarative Headers:</strong> Utilization of <code class="inline-code">stale-while-revalidate</code> standard in controllers.',
  'roadmap.p5_b2_item2': '<strong>Backend Offloading:</strong> Subsequent requests are fulfilled by the global CDN, eliminating redundant database hits.',
  'roadmap.p5_b2_item3': '<strong>Payload Sanitization:</strong> Output filters ensure only data relevant to current state is exposed.',

  // Phase 06
  'roadmap.p6_tag1': 'Docker Compose',
  'roadmap.p6_tag2': '3–5 days',
  'roadmap.p6_b1_title': 'Selected Production Stack',
  'roadmap.p6_b1_item1': '<strong>Backend:</strong> C# .NET 10 (ASP.NET Core Web API, MediatR, Hosted Services).',
  'roadmap.p6_b1_item2': '<strong>Frontend:</strong> React 19, TypeScript, Vite, Tailwind CSS, and Standalone PWA.',
  'roadmap.p6_b1_item3': '<strong>Database:</strong> MongoDB (Atomic NoSQL with compound indexes).',
  'roadmap.p6_b1_item4': '<strong>Edge and Deployment:</strong> Edge CDN with RFC-7234 HTTP caching.',
  'roadmap.p6_b2_title': 'Containerization Fundamentals',
  'roadmap.p6_b2_item1': '<strong>Resource Isolation:</strong> Explicit memory limits (<code class="inline-code">mem_limit</code>) configured per service.',
  'roadmap.p6_b2_item2': '<strong>Hot Reload Productivity:</strong> Optimized bind mounts and watchers for continuous compilation across C# and Frontend.',
  'roadmap.p6_b2_item3': '<strong>Active Healthchecks:</strong> Services await database readiness before initiating application bootstrap.',
  'roadmap.p6_artifact': '<strong>Artifact Delivered in Phase 06:</strong> <em>Multi-Container Docker Compose Orchestration</em>, ensuring complete parity between local environment and production with a single-command startup.',

  // Phase 07
  'roadmap.p7_tag1': 'Testing and OpenAPI',
  'roadmap.p7_tag2': '2–3 days',
  'roadmap.p7_b1_title': 'Contracts Strategy and Automated Testing',
  'roadmap.p7_b1_item1': '<strong>Interface Contracts (OpenAPI 3.0 / Swagger):</strong> Standardized routes for querying dates, game aggregates, simulations, and system status.',
  'roadmap.p7_b1_item2': '<strong>Unit and Domain Tests (C# .NET xUnit):</strong> Comprehensive coverage of business rules, mathematical computations, and fallback resilience.',
  'roadmap.p7_b1_item3': '<strong>Component and Hook Tests (Frontend Vitest):</strong> Validation of rendering, global state management, and PWA compatibility.',
  'roadmap.p7_b1_item4': '<strong>End-to-End BDD Tests (Playwright):</strong> Real-world user journey simulation covering first visit, navigation, and filters.',

  // Phase 08
  'roadmap.p8_tag1': 'Live in Production',
  'roadmap.p8_tag2': '1–2 days',
  'roadmap.p8_gate_title': 'Production Readiness Gate Status',
  'roadmap.p8_col1_title': '✓ FUNDAMENTALS AND BACKEND (100%)',
  'roadmap.p8_col1_item1': 'Clean Architecture in C# .NET 10 implemented',
  'roadmap.p8_col1_item2': 'Zero-Compute Decoupling in Background Workers',
  'roadmap.p8_col1_item3': 'Atomic NoSQL persistence in O(1) time',
  'roadmap.p8_col1_item4': '100% of xUnit test suite passing',
  'roadmap.p8_col2_title': '✓ FRONTEND AND PERFORMANCE (100%)',
  'roadmap.p8_col2_item1': 'Edge Caching with sub-35ms TTFB',
  'roadmap.p8_col2_item2': 'Stale-while-revalidate RFC-7234',
  'roadmap.p8_col2_item3': 'PWA with native Offline First mode',
  'roadmap.p8_col2_item4': 'Core Web Vitals in the green zone (100/100)',
  'roadmap.p8_col3_title': '✓ QUALITY AND RESILIENCE (100%)',
  'roadmap.p8_col3_item1': 'OpenAPI 3.0 contracts documented',
  'roadmap.p8_col3_item2': 'Cascading fallback across LLMs',
  'roadmap.p8_col3_item3': 'E2E tests covering 100% of BDD flows',
  'roadmap.p8_col3_item4': 'Reproducible Multi-Container Docker',
  'roadmap.p8_verdict': '<strong>Gate Verdict: [LIVE IN PRODUCTION]</strong> The platform has been certified and operates continuously in production. Asynchronous C# .NET workers perform pre-processing of data, delivering an instant and stable experience for the end user with lean operational costs.',

  // Timeline
  'roadmap.tline1_title': 'Week 1 · Discovery and Solution Modeling',
  'roadmap.tline1_desc': 'Root Cause Analysis of business pain · Definition of Engineering KPIs · Asynchronous Processing Strategy',
  'roadmap.tline2_title': 'Week 2 · DDD Domain and NoSQL Persistence',
  'roadmap.tline2_desc': 'Atomic Aggregate Modeling in C# · Eliminating N+1 queries · Compound indexes and O(1) reads',
  'roadmap.tline3_title': 'Week 3 · Clean Architecture and Hosted Workers (.NET 10)',
  'roadmap.tline3_desc': 'ADR #001 Zero-Compute Decoupling · ADR #002 AI Resilience Chain · Background Ingestion and Processing',
  'roadmap.tline4_title': 'Week 4 · Modern Frontend, Edge Caching and Testing',
  'roadmap.tline4_desc': 'React 19 + PWA · RFC-7234 Cache Headers (stale-while-revalidate) · Automated Test Suite (xUnit, Vitest, E2E)',
  'roadmap.tline5_title': 'Production · Live in Production',
  'roadmap.tline5_desc': 'Platform operating in production with high availability, optimized cost, and instant user response.',

  // Footer Progress Bar
  'roadmap.progress_footer_label': 'COSTAR · Software Engineering Roadmap (SaaS Case Study)',

  // ─── Volume 02: System Design ───
  'sd.brand': 'System Design',
  'sd.series': 'vol. 2 / 2',
  'sd.eyebrow': '// Decisional COSTAR · Software Architecture',
  'sd.title': 'Pre-processing of<br><em>Architectural Decisions</em>',
  'sd.desc': 'An interactive workbench to map context, declare trade-offs, apply the Pareto principle, and select the right architectural pattern — before the first line of code.',
  'sd.badge_num': '20%',
  'sd.badge_lbl': 'of decisions →<br>80% of impact',
  'sd.btn_generate': 'Generate Decision Summary',
  'sd.btn_copy': 'Copy Markdown',
  'sd.btn_copied': '✓ Copied!',

  // ─── 404 Error Page ───
  '404.badge': '// FATAL: 0x00000404 · Segment Fault in /dev/null',
  '404.title': '404 · NullReferenceException',
  '404.desc': 'The requested route points to a null reference in memory or was dropped in the CI/CD pipeline.',
  '404.hypo_title': '[ROOT CAUSE ANALYSIS · ENGINEERING DIAGNOSTIC]',
  '404.hypo_1': 'Hypothesis 01: The intern ran git push --force on Friday at 6 PM.',
  '404.hypo_2': 'Hypothesis 02: The Garbage Collector reclaimed this page as unreachable.',
  '404.hypo_3': 'Hypothesis 03: You tried to access a route without putting a semicolon at the end.',
  '404.btn_home': 'cd /home ➔',
  '404.btn_roadmap': 'git checkout roadmap ➔',
  '404.btn_coffee': '☕ sudo make-coffee',
  '404.coffee_msg': 'HTTP 418: I\'m a teapot · Espresso coffee provisioned with zero latency in cache memory!',

  // ─── Engineering Blog and Articles ───
  'blog.badge': '// Publications and Technical Articles',
  'blog.title': 'Engineering Blog and Articles',
  'blog.subtitle': 'Deep dives on Clean Architecture, System Design, Web Performance, and Software Engineering.',
  'blog.all': 'All',
  'blog.filter_label': 'Filter by Topic:',
  'blog.empty': 'No articles found for the selected tag.',
  'blog.error': 'Unable to load articles at the moment. Please try reloading the page.',
  'blog.read_more': 'Read article ⟶',
  'blog.published_at': 'Published on',
  'blog.reading_time': 'min read',
  'blog.back': '← Back to Blog',
  'blog.noscript_msg': '⚡ JavaScript is disabled. Dynamic listing and filters require JavaScript, but individual articles are fully accessible statically.',

  // ─── Article Series ───
  'series.label': 'Series',
  'series.part_of': 'Part {part} of {total}',
  'series.previous': '← Previous',
  'series.next': 'Next →',
  'series.upcoming': 'coming soon',
  'blog.post.series_part': 'Series: {series} · Part {part} of {total}',
  'blog.post.next': 'Next',
  'blog.post.back': 'Back to blog',

  // ─── PWA and Lifecycle ───
  'pwa.update_available': 'New version available with layout and performance updates.',
  'pwa.update_btn': 'Update now',

  // ─── Post Details and Author ───
  'blog.post.breadcrumbs_home': 'Home',
  'blog.post.breadcrumbs_blog': 'Blog',
  'blog.post.author_role': 'Software Engineer and FullStack C#/React',
  'blog.post.about_author': 'About the Author',
  'blog.post.about_author_bio': 'Software Engineer and FullStack C#/React specialized in Clean Architecture, Web Performance, DDD, and dependency-free architecture.',
  'blog.post.view_roadmap': 'View SaaS Roadmap',
  'blog.post.noscript': '⚡ Static Mode (No JavaScript): This article is 100% readable and accessible without JavaScript. Theme toggling and interactive features require JavaScript.'
}
  };

  Object.freeze(dictionaries.pt);
  Object.freeze(dictionaries.en);
  Object.freeze(dictionaries);

  // ─── ICONS PADRONIZADOS EM VETOR SVG (COMPATIBILIDADE UNIVERSAL) ───
  const SVG_ICONS = {
    sun: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    moon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    terminal: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
    layout: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
    flagBR: `<svg width="15" height="11" viewBox="0 0 20 14" fill="none" aria-hidden="true" class="lang-flag"><rect width="20" height="14" rx="2" fill="#059669"/><polygon points="10,1.8 18.2,7 10,12.2 1.8,7" fill="#F59E0B"/><circle cx="10" cy="7" r="3.2" fill="#1D4ED8"/><path d="M7.1 7.7 Q10 5.6 12.9 6.3" stroke="#FFFFFF" stroke-width="0.75" fill="none" stroke-linecap="round"/><circle cx="10.2" cy="5.2" r="0.28" fill="#FFFFFF"/><circle cx="10" cy="8.2" r="0.28" fill="#FFFFFF"/><circle cx="9.3" cy="7.8" r="0.22" fill="#FFFFFF"/><circle cx="10.7" cy="7.8" r="0.22" fill="#FFFFFF"/><circle cx="10" cy="9.0" r="0.2" fill="#FFFFFF"/></svg>`,
    flagUS: `<svg width="15" height="11" viewBox="0 0 20 14" fill="none" aria-hidden="true" class="lang-flag"><rect width="20" height="14" rx="2" fill="#B91C1C"/><path d="M0 1.08h20v1.08H0z M0 3.23h20v1.08H0z M0 5.38h20v1.08H0z M0 7.54h20v1.08H0z M0 9.69h20v1.08H0z M0 11.85h20v1.08H0z" fill="#FFFFFF"/><rect width="8.5" height="7.54" rx="1" fill="#1E3A8A"/><circle cx="2" cy="1.9" r="0.6" fill="#FFFFFF"/><circle cx="4.25" cy="1.9" r="0.6" fill="#FFFFFF"/><circle cx="6.5" cy="1.9" r="0.6" fill="#FFFFFF"/><circle cx="3.12" cy="3.77" r="0.6" fill="#FFFFFF"/><circle cx="5.37" cy="3.77" r="0.6" fill="#FFFFFF"/><circle cx="2" cy="5.64" r="0.6" fill="#FFFFFF"/><circle cx="4.25" cy="5.64" r="0.6" fill="#FFFFFF"/><circle cx="6.5" cy="5.64" r="0.6" fill="#FFFFFF"/></svg>`
  };

  // ─── VIEW TRANSITION HELPER (ECMAScript and Web Standards) ───
  function withViewTransition(callback) {
    if (typeof document !== 'undefined' && typeof document.startViewTransition === 'function') {
      return document.startViewTransition(callback);
    }
    return callback();
  }

  // ═════════════════════════════════════════════════════════════════════
  // 2. MOTOR DE INTERNACIONALIZAÇÃO (i18n)
  // ═════════════════════════════════════════════════════════════════════
  const STORAGE_KEY_LANG = 'costar_preferred_lang';

  function getSavedLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'pt' || saved === 'en') return saved;
    } catch (e) {}
    const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }

  let currentLang = getSavedLanguage();

  function applyLanguage(lang) {
    currentLang = lang === 'pt' ? 'pt' : 'en';
    try { localStorage.setItem(STORAGE_KEY_LANG, currentLang); } catch (e) {}
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
    document.documentElement.setAttribute('data-lang', currentLang);

    const dict = dictionaries[currentLang] || dictionaries.pt;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (dict[key].includes('<') && dict[key].includes('>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });

    document.querySelectorAll('.lang-toggle').forEach(btn => {
      if (currentLang === 'pt') {
        btn.innerHTML = `${SVG_ICONS.flagBR} <span>PT</span>`;
        btn.setAttribute('aria-label', 'PT - Alternar Idioma');
      } else {
        btn.innerHTML = `${SVG_ICONS.flagUS} <span>EN</span>`;
        btn.setAttribute('aria-label', 'EN - Switch Language');
      }
    });

    const isDev = document.documentElement.getAttribute('data-view') === 'dev';
    document.querySelectorAll('.view-toggle').forEach(btn => {
      if (isDev) {
        btn.innerHTML = `${SVG_ICONS.layout} <span>${dict['btn.std_mode'] || 'Modo Padrão'}</span>`;
      } else {
        btn.innerHTML = `${SVG_ICONS.terminal} <span>${dict['btn.dev_mode'] || 'Modo Dev'}</span>`;
      }
    });

    try {
      window.dispatchEvent(new CustomEvent('costar:languagechange', { detail: { lang: currentLang } }));
    } catch (e) {}
    if (typeof window.updateProgress === 'function') {
      try { window.updateProgress(); } catch (e) {}
    }
  }

  function toggleLanguage() {
    withViewTransition(() => {
      applyLanguage(currentLang === 'pt' ? 'en' : 'pt');
    });
  }

  window.toggleLanguage = toggleLanguage;
  window.getCurrentLanguage = function () { return currentLang; };
  window.getDictionary = function (lang) { return dictionaries[lang || currentLang] || dictionaries.pt; };

  window.makeCoffee = function () {
    const dict = dictionaries[currentLang] || dictionaries.pt;
    const msg = dict['404.coffee_msg'] || (currentLang === 'en'
      ? "HTTP 418: I'm a teapot · Espresso coffee provisioned with zero latency in cache memory! ☕"
      : "HTTP 418: I'm a teapot · Café expresso provisionado com sucesso na memória cache! ☕");
    alert(msg);
  };

  // ═════════════════════════════════════════════════════════════════════
  // 3. GERENCIADOR DE TEMA (Dark / Light)
  // ═════════════════════════════════════════════════════════════════════
  const STORAGE_KEY_THEME = 'costar_preferred_theme';

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  let currentTheme = getSavedTheme();

  function applyTheme(theme) {
    currentTheme = theme === 'light' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE_KEY_THEME, currentTheme); } catch (e) {}
    document.documentElement.setAttribute('data-theme', currentTheme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = currentTheme === 'dark' ? SVG_ICONS.sun : SVG_ICONS.moon;
    });
  }

  function toggleTheme() {
    withViewTransition(() => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  window.toggleTheme = toggleTheme;

  // ═════════════════════════════════════════════════════════════════════
  // 4. GERENCIADOR DE MODO DE EXIBIÇÃO (Standard vs Dev Mode)
  // ═════════════════════════════════════════════════════════════════════
  const STORAGE_KEY_VIEW = 'costar_view_mode';

  function getSavedViewMode() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIEW);
      if (saved === 'standard' || saved === 'dev') return saved;
    } catch (e) {}
    return 'standard';
  }

  let currentView = getSavedViewMode();

  function applyViewMode(mode) {
    currentView = mode === 'dev' ? 'dev' : 'standard';
    try { localStorage.setItem(STORAGE_KEY_VIEW, currentView); } catch (e) {}

    document.documentElement.setAttribute('data-view', currentView);

    const dict = dictionaries[currentLang] || dictionaries.pt;
    document.querySelectorAll('.view-toggle').forEach(btn => {
      if (currentView === 'dev') {
        btn.innerHTML = `${SVG_ICONS.layout} <span>${dict['btn.std_mode'] || 'Modo Padrão'}</span>`;
        btn.classList.add('active-dev');
      } else {
        btn.innerHTML = `${SVG_ICONS.terminal} <span>${dict['btn.dev_mode'] || 'Modo Dev'}</span>`;
        btn.classList.remove('active-dev');
      }
    });

    if (currentView === 'dev') {
      setTimeout(() => {
        const inp = document.getElementById('terminalInput');
        if (inp) {
          try {
            inp.focus({ preventScroll: true });
          } catch (e) {
            inp.focus();
          }
        }
      }, 100);
    }
  }

  function toggleViewMode() {
    const nextMode = currentView === 'standard' ? 'dev' : 'standard';
    try { localStorage.setItem(STORAGE_KEY_VIEW, nextMode); } catch (e) {}

    // Se estiver em subpágina (como roadmap-requisitos.html), navega para index.html ativando o modo
    if (!document.getElementById('terminalOutput')) {
      window.location.href = 'index.html';
      return;
    }

    applyViewMode(nextMode);
  }

  window.toggleViewMode = toggleViewMode;

  // ═════════════════════════════════════════════════════════════════════
  // 5. TERMINAL INTERATIVO (Modo Dev)
  // ═════════════════════════════════════════════════════════════════════
  function initTerminalEngine() {
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const terminalForm = document.getElementById('terminalForm');

    if (!terminalOutput) return;

    function appendLine(html, type = 'output') {
      const line = document.createElement('div');
      line.className = `term-line term-${type}`;
      line.innerHTML = html;
      terminalOutput.appendChild(line);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    const commandAliases = {
      'ls': 'projects',
      'ls projects/': 'projects',
      'ls -la': 'projects',
      'ls projects': 'projects',
      'portfolio': 'projects',
      'history': 'story',
      'cat story.log': 'story',
      'story.log': 'story',
      'log': 'story',
      'timeline': 'story',
      './contact.sh': 'contact',
      'sh contact.sh': 'contact',
      'email': 'contact',
      './costar': 'costar',
      'costar --status': 'costar',
      'roadmap': 'costar',
      'cls': 'clear'
    };

    function getDict(isPt) {
      return isPt ? dictionaries.pt : dictionaries.en;
    }

    const commandRegistry = {
      help: (isPt) => {
        const d = getDict(isPt);
        return `
<div class="term-box">
  <div class="term-title" data-i18n="terminal.help_title">${d['terminal.help_title']}</div>
  <div class="term-grid">
    <div><strong class="term-hl">whoami</strong></div><div data-i18n="terminal.help_whoami">${d['terminal.help_whoami']}</div>
    <div><strong class="term-hl">ls</strong> / <strong class="term-hl">projects</strong></div><div data-i18n="terminal.help_projects">${d['terminal.help_projects']}</div>
    <div><strong class="term-hl">story</strong> / <strong class="term-hl">log</strong></div><div data-i18n="terminal.help_story">${d['terminal.help_story']}</div>
    <div><strong class="term-hl">contact</strong></div><div data-i18n="terminal.help_contact">${d['terminal.help_contact']}</div>
    <div><strong class="term-hl">costar</strong></div><div data-i18n="terminal.help_costar">${d['terminal.help_costar']}</div>
    <div><strong class="term-hl">theme</strong></div><div data-i18n="terminal.help_theme">${d['terminal.help_theme']}</div>
    <div><strong class="term-hl">lang</strong></div><div data-i18n="terminal.help_lang">${d['terminal.help_lang']}</div>
    <div><strong class="term-hl">clear</strong></div><div data-i18n="terminal.help_clear">${d['terminal.help_clear']}</div>
  </div>
</div>`;
      },

      whoami: (isPt) => {
        const d = getDict(isPt);
        return `
<div class="term-card">
  <div class="term-user-title"><strong data-i18n="terminal.whoami_title">${d['terminal.whoami_title']}</strong></div>
  <p data-i18n="terminal.whoami_desc">${d['terminal.whoami_desc']}</p>
  <ul class="term-tags" aria-label="Especialidades">
    <li class="term-tag" data-i18n="terminal.whoami_tag_ts">${d['terminal.whoami_tag_ts']}</li>
    <li class="term-tag" data-i18n="terminal.whoami_tag_clean">${d['terminal.whoami_tag_clean']}</li>
    <li class="term-tag" data-i18n="terminal.whoami_tag_perf">${d['terminal.whoami_tag_perf']}</li>
    <li class="term-tag" data-i18n="terminal.whoami_tag_docker">${d['terminal.whoami_tag_docker']}</li>
    <li class="term-tag" data-i18n="terminal.whoami_tag_avalonia">${d['terminal.whoami_tag_avalonia']}</li>
    <li class="term-tag" data-i18n="terminal.whoami_tag_db">${d['terminal.whoami_tag_db']}</li>
    <li class="term-tag" data-i18n="terminal.whoami_tag_sd">${d['terminal.whoami_tag_sd']}</li>
  </ul>
  <div class="term-status-available" data-i18n="terminal.whoami_status">
    ${d['terminal.whoami_status']}
  </div>
</div>`;
      },

      projects: (isPt) => {
        const d = getDict(isPt);
        return `
<div class="term-table-wrap">
  <div class="term-title" data-i18n="terminal.projects_title">${d['terminal.projects_title']}</div>
  <table class="term-table">
    <thead>
      <tr>
        <th data-i18n="terminal.th_name">${d['terminal.th_name']}</th>
        <th data-i18n="terminal.th_stack">${d['terminal.th_stack']}</th>
        <th data-i18n="terminal.th_type">${d['terminal.th_type']}</th>
        <th data-i18n="terminal.th_link">${d['terminal.th_link']}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj_fs_name">${d['terminal.proj_fs_name']}</strong></td>
        <td data-i18n="terminal.proj_fs_stack">${d['terminal.proj_fs_stack']}</td>
        <td data-i18n="terminal.proj_fs_type">${d['terminal.proj_fs_type']}</td>
        <td><a href="https://firststrikeanalytics.com.br" target="_blank" rel="noopener noreferrer" class="term-link" data-i18n="terminal.proj_fs_link">[firststrikeanalytics.com.br] ↗</a></td>
      </tr>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj_planexa_name">${d['terminal.proj_planexa_name']}</strong></td>
        <td data-i18n="terminal.proj_planexa_stack">${d['terminal.proj_planexa_stack']}</td>
        <td data-i18n="terminal.proj_planexa_type">${d['terminal.proj_planexa_type']}</td>
        <td><span class="term-dim" data-i18n="terminal.proj_planexa_status">${d['terminal.proj_planexa_status']}</span></td>
      </tr>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj_ops_name">${d['terminal.proj_ops_name']}</strong></td>
        <td data-i18n="terminal.proj_ops_stack">${d['terminal.proj_ops_stack']}</td>
        <td data-i18n="terminal.proj_ops_type">${d['terminal.proj_ops_type']}</td>
        <td><span class="term-dim" data-i18n="terminal.proj_ops_status">${d['terminal.proj_ops_status']}</span></td>
      </tr>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj1_name">${d['terminal.proj1_name']}</strong></td>
        <td data-i18n="terminal.proj1_stack">${d['terminal.proj1_stack']}</td>
        <td data-i18n="terminal.proj1_type">${d['terminal.proj1_type']}</td>
        <td><a href="roadmap-requisitos.html" class="term-link" data-i18n="terminal.proj1_link">${d['terminal.proj1_link']}</a></td>
      </tr>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj2_name">${d['terminal.proj2_name']}</strong></td>
        <td data-i18n="terminal.proj2_stack">${d['terminal.proj2_stack']}</td>
        <td data-i18n="terminal.proj2_type">${d['terminal.proj2_type']}</td>
        <td><span class="term-dim" data-i18n="terminal.proj2_status">${d['terminal.proj2_status']}</span></td>
      </tr>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj3_name">${d['terminal.proj3_name']}</strong></td>
        <td data-i18n="terminal.proj3_stack">${d['terminal.proj3_stack']}</td>
        <td data-i18n="terminal.proj3_type">${d['terminal.proj3_type']}</td>
        <td><span class="term-dim" data-i18n="terminal.proj3_status">${d['terminal.proj3_status']}</span></td>
      </tr>
    </tbody>
  </table>
</div>`;
      },

      story: (isPt) => {
        const d = getDict(isPt);
        return `
<div class="term-box">
  <div class="term-title" data-i18n="terminal.story_title">${d['terminal.story_title']}</div>
  <div class="term-log-entry">
    <span class="term-hash">c057a01</span> <span class="term-branch">(HEAD -> main)</span> <strong data-i18n="terminal.story_m3_role">${d['terminal.story_m3_role']}</strong> <span data-i18n="terminal.story_m3_desc">${d['terminal.story_m3_desc']}</span>
  </div>
  <div class="term-log-entry">
    <span class="term-hash">a94f12b</span> <strong data-i18n="terminal.story_m2_role">${d['terminal.story_m2_role']}</strong> <span data-i18n="terminal.story_m2_desc">${d['terminal.story_m2_desc']}</span>
  </div>
  <div class="term-log-entry">
    <span class="term-hash">38e09f4</span> <strong data-i18n="terminal.story_m1_role">${d['terminal.story_m1_role']}</strong> <span data-i18n="terminal.story_m1_desc">${d['terminal.story_m1_desc']}</span>
  </div>
</div>`;
      },

      contact: (isPt) => {
        const d = getDict(isPt);
        const copiedAlert = isPt ? '✓ E-mail Copiado!' : '✓ E-mail Copied!';
        return `
<div class="term-card">
  <div class="term-title" data-i18n="terminal.contact_title">${d['terminal.contact_title']}</div>
  <p data-i18n="terminal.contact_desc">${d['terminal.contact_desc']}</p>
  <div class="term-row-spaced">
    <div><strong data-i18n="terminal.contact_email_label">${d['terminal.contact_email_label']}</strong> <code class="inline-code">paulo.dukven@gmail.com</code> <button type="button" class="term-copy-btn" onclick="navigator.clipboard.writeText('paulo.dukven@gmail.com');alert('${copiedAlert}')" data-i18n="terminal.contact_copy_btn">${d['terminal.contact_copy_btn']}</button></div>
    <div><strong data-i18n="terminal.contact_github_label">${d['terminal.contact_github_label']}</strong> <a href="https://github.com/pvduk" target="_blank" rel="noopener noreferrer" class="term-link">github.com/pvduk</a></div>
    <div><strong data-i18n="terminal.contact_linkedin_label">${d['terminal.contact_linkedin_label']}</strong> <a href="https://linkedin.com/in/pvduk" target="_blank" rel="noopener noreferrer" class="term-link">linkedin.com/in/pvduk</a></div>
  </div>
  <div class="term-dim" data-i18n="terminal.contact_sla">● ${d['terminal.contact_sla']}</div>
</div>`;
      },

      costar: (isPt) => {
        const d = getDict(isPt);
        return `
<div class="term-box">
  <div class="term-title" data-i18n="terminal.costar_title">${d['terminal.costar_title']}</div>
  <div><strong data-i18n="terminal.costar_item1">${d['terminal.costar_item1']}</strong> <span class="text-green" data-i18n="terminal.costar_status1">${d['terminal.costar_status1']}</span> <a href="roadmap-requisitos.html" class="term-link">roadmap-requisitos.html</a></div>
</div>`;
      },

      theme: (isPt) => {
        toggleTheme();
        return `✓ ${isPt ? 'Tema alterado com sucesso.' : 'Theme changed successfully.'}`;
      },

      lang: (isPt) => {
        toggleLanguage();
        return `✓ ${isPt ? 'Idioma alterado para Inglês.' : 'Language changed to Portuguese.'}`;
      },

      clear: (isPt) => {
        terminalOutput.innerHTML = '';
        return `<span class="term-dim">${isPt ? 'Terminal limpo. Digite "help" para ver a lista de comandos.' : 'Terminal cleared. Type "help" to see available commands.'}</span>`;
      }
    };

    function executeCommand(cmdRaw) {
      const cleanCmd = (cmdRaw || '').trim().toLowerCase();
      if (!cleanCmd) return;

      appendLine(`<span class="term-prompt-user">pvduk@dev-station</span>:<span class="term-prompt-path">~</span>$ <span class="term-cmd-text">${escapeHtml(cmdRaw)}</span>`, 'command');

      const isPt = currentLang === 'pt';
      const resolvedCmd = commandAliases[cleanCmd] || cleanCmd;
      const handler = commandRegistry[resolvedCmd];

      if (typeof handler === 'function') {
        const result = handler(isPt);
        if (result) appendLine(result);
      } else {
        appendLine(`zsh: command not found: <span class="text-red">${escapeHtml(cmdRaw)}</span>. ${isPt ? 'Digite "help" para ver os comandos disponíveis.' : 'Type "help" to list available commands.'}`, 'error');
      }
    }

    if (terminalForm) {
      terminalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!terminalInput) return;
        const val = terminalInput.value;
        if (val) {
          executeCommand(val);
          terminalInput.value = '';
        }
      });
    }

    document.querySelectorAll('[data-term-cmd]').forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-term-cmd');
        if (cmd) executeCommand(cmd);
      });
    });

    window.runTerminalCommand = executeCommand;
  }

  // ═════════════════════════════════════════════════════════════════════
  // 6. ROADMAP DE REQUISITOS (Acordeões e Progresso)
  // ═════════════════════════════════════════════════════════════════════
  function initRoadmapEngine() {
    function updateProgress() {
      const phases = document.querySelectorAll('.phase');
      if (!phases.length) return;
      const openCount = document.querySelectorAll('.phase.open').length;
      const pct = Math.round((openCount / phases.length) * 100);

      const fill = document.getElementById('progress-fill');
      const text = document.getElementById('progress-text');

      const dict = dictionaries[currentLang] || dictionaries.pt;
      if (fill) fill.style.width = pct + '%';
      if (text) text.textContent = `${openCount} / ${phases.length} ${dict['roadmap.progress_text'] || 'fases abertas'}`;
    }

    window.togglePhase = function (header) {
      const phase = header.closest('.phase');
      if (phase) {
        phase.classList.toggle('open');
        updateProgress();
      }
    };

    window.updateProgress = updateProgress;
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('costar:languagechange', updateProgress);
    }

    const firstPhase = document.querySelector('[data-phase="0"]');
    if (firstPhase) firstPhase.classList.add('open');
    updateProgress();
  }

  // ═════════════════════════════════════════════════════════════════════
  // 7. INICIALIZAÇÃO UNIVERSAL (DOM Ready)
  // ═════════════════════════════════════════════════════════════════════
  function bootstrap() {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    applyViewMode(currentView);

    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLanguage();
      });
    });

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });

    document.querySelectorAll('.view-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleViewMode();
      });
    });

    // ─── SMART EMAIL COMPOSER and WEB3FORMS (ASYNC FETCH) ───
    const contactForm = document.getElementById('contactForm');
    const subjectInput = document.getElementById('contactSubject');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const composerStatus = document.getElementById('composerStatus');
    const btnSendEmail = document.getElementById('btnSendEmail');
    const subjectTags = document.querySelectorAll('.subject-tag');

    subjectTags.forEach(tag => {
      tag.addEventListener('click', () => {
        subjectTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        if (subjectInput) {
          const val = currentLang === 'en' && tag.getAttribute('data-subject-en')
            ? tag.getAttribute('data-subject-en')
            : tag.getAttribute('data-subject');
          subjectInput.value = val || tag.textContent.trim();
        }
      });
    });

    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dict = dictionaries[currentLang] || dictionaries.pt;
        if (!emailInput || !emailInput.value.trim() || !messageInput || !messageInput.value.trim()) {
          return;
        }

        const originalBtnHtml = btnSendEmail ? btnSendEmail.innerHTML : '';
        if (btnSendEmail) {
          btnSendEmail.disabled = true;
          btnSendEmail.innerHTML = `<span>⏳ ${dict['contact.sending'] || 'Enviando...'}</span>`;
        }

        if (composerStatus) {
          composerStatus.style.display = 'none';
          composerStatus.className = 'composer-status';
        }

        try {
          const formData = new FormData(contactForm);
          if (subjectInput) {
            formData.set('subject', subjectInput.value.trim());
          }
          formData.set('access_key', 'd4d219ae-6575-4b32-b4a1-bf14f65fb12c');

          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
          });

          const data = await response.json().catch(() => ({}));

          if (response.ok && data.success !== false) {
            if (composerStatus) {
              composerStatus.textContent = dict['contact.success'] || '✓ Mensagem enviada com sucesso! Responderei em breve.';
              composerStatus.className = 'composer-status success';
              composerStatus.style.display = 'block';
            }
            if (messageInput) messageInput.value = '';
            if (emailInput) emailInput.value = '';
          } else {
            throw new Error(data.message || 'Falha no envio');
          }
        } catch (err) {
          if (composerStatus) {
            composerStatus.textContent = dict['contact.error'] || 'Erro ao enviar. Por favor, tente novamente ou envie direto para paulo.dukven@gmail.com';
            composerStatus.className = 'composer-status error';
            composerStatus.style.display = 'block';
          }
        } finally {
          if (btnSendEmail) {
            btnSendEmail.disabled = false;
            btnSendEmail.innerHTML = originalBtnHtml;
          }
        }
      });
    }

    initTerminalEngine();
    initRoadmapEngine();
    initProjectTabs();
    initPWA();
  }

  // ═════════════════════════════════════════════════════════════════════
  // 7.1 ABAS DE PROJETOS FLAGSHIP (WAI-ARIA TABS ENGINE)
  // ═════════════════════════════════════════════════════════════════════
  function initProjectTabs() {
    const tabList = document.querySelector('.project-tabs-nav');
    if (!tabList) return;

    const tabs = document.querySelectorAll('.project-tab-btn');
    const panels = document.querySelectorAll('.project-tab-panel');

    function selectTab(selectedTab) {
      const targetPanelId = selectedTab.getAttribute('aria-controls');

      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.classList.toggle('active', isSelected);
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      });

      panels.forEach((panel) => {
        if (panel.id === targetPanelId) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        selectTab(tab);
      });

      tab.addEventListener('keydown', (e) => {
        let newIndex = index;
        if (e.key === 'ArrowRight') {
          newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          newIndex = 0;
        } else if (e.key === 'End') {
          newIndex = tabs.length - 1;
        } else {
          return;
        }

        e.preventDefault();
        tabs[newIndex].focus();
        selectTab(tabs[newIndex]);
      });
    });
  }

  // ═════════════════════════════════════════════════════════════════════
  // 8. PROGRESSIVE WEB APP (PWA) SERVICE WORKER E CICLO DE VIDA
  // ═════════════════════════════════════════════════════════════════════
  function showUpdateToast(worker) {
    if (document.getElementById('pwaUpdateToast')) return;

    const currentLang = localStorage.getItem('costar_lang') || 'pt';
    const isPt = currentLang === 'pt';
    const dict = (window.__PVDUK_DICTS && window.__PVDUK_DICTS[currentLang]) || dictionaries[currentLang] || dictionaries.pt;

    const msg = dict['pwa.update_available'] || (isPt 
      ? 'Nova versão disponível com melhorias de layout e performance.' 
      : 'New version available with layout and performance updates.');
    const btnText = dict['pwa.update_btn'] || (isPt ? 'Atualizar agora' : 'Update now');

    const toast = document.createElement('aside');
    toast.id = 'pwaUpdateToast';
    toast.className = 'pwa-update-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');

    toast.innerHTML = `
      <div class="pwa-update-content">
        <span class="pwa-update-dot" aria-hidden="true"></span>
        <span class="pwa-update-msg" data-i18n="pwa.update_available">${escapeHtml(msg)}</span>
      </div>
      <div class="pwa-update-actions">
        <button type="button" class="btn btn-primary pwa-update-btn" id="btnPwaUpdate" data-i18n="pwa.update_btn">${escapeHtml(btnText)}</button>
      </div>
    `;

    document.body.appendChild(toast);

    const btn = toast.querySelector('#btnPwaUpdate');
    if (btn) {
      btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.textContent = isPt ? 'Atualizando...' : 'Updating...';
        if (worker) {
          worker.postMessage({ type: 'SKIP_WAITING' });
        }
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  }

  function initPWA() {
    if ('serviceWorker' in navigator && window.location.protocol && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        let refreshing = false;

        // Recarregamento coordenado e único quando o novo SW assume o controle
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
        });

        navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
          .then((reg) => {
            // Verificação periódica de atualizações ao reabrir o PWA ou focar na janela
            document.addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'visible') {
                reg.update().catch(() => {});
              }
            });

            // Se já há um worker esperando ativação imediata
            if (reg.waiting && navigator.serviceWorker.controller) {
              showUpdateToast(reg.waiting);
            }

            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[PWA] Nova versão disponível. Exibindo banner de atualização.');
                    showUpdateToast(installingWorker);
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn('[PWA] Falha ao registrar Service Worker:', err);
          });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
