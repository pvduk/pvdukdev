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
      'nav.home': 'Início',
      'nav.roadmap': 'Roadmap',
      'nav.brand': 'pvduk · dev',
      'nav.series': 'Engenheiro de Software',
      'btn.lang': 'PT',
      'btn.theme_toggle': 'Alternar Tema',
      'btn.dev_mode': 'Modo Dev',
      'btn.std_mode': 'Modo Padrão',
      'footer.author': 'Feito à mão com Vanilla Web Standards e Clean Architecture.',

      'hub.badge_status': 'Disponível para projetos e consultoria',
      'hub.hero_title': 'Engenheiro de Software e<br><em>FullStack C#/React</em>',
      'hub.hero_tagline': 'Especialista em arquitetura limpa, sistemas distribuídos, performance web e desenvolvimento frontend puro.',
      'hub.btn_explore': 'Explorar Portfólio ↓',
      'hub.btn_contact': 'Fale Conosco ⟶',

      'disc.system_design': 'System Design',
      'disc.clean_arch': 'Clean Architecture',
      'disc.web_perf': 'Web Performance (CWV)',
      'disc.avalonia_ui': 'Avalonia UI',
      'disc.sql_nosql': 'SQL e NoSQL',
      'disc.iac_docker': 'IaC e Docker',

      'hub.section_flagship': 'Projeto em Destaque',
      'hub.section_projects': 'Especialidades Técnicas',
      'hub.section_story': 'Ápices nos Projetos',
      'hub.section_contact': 'Fale Conosco',
      'hub.section_connections': 'Conexões',

      'vol1.tag': 'Projeto Principal · Processo e Estudo de Caso',
      'vol1.title': 'Roadmap de Engenharia e Requisitos',
      'vol1.desc': 'Guia estruturado em 8 fases com o estudo de caso real do projeto FirstStrike Analytics: do discovery de negócio ao Gate de Entrada no Sprint 0.',
      'vol1.feat1': 'Exemplo prático, simples e intuitivo para qualquer usuário',
      'vol1.feat2': 'Diagramas C4 Nível 1, DDD e tabelas NoSQL',
      'vol1.feat3': 'Contrato OpenAPI 3.0 e ambiente Docker Compose real',
      'vol1.btn': 'Acessar Roadmap Interativo ⟶',

      'vol2.tag': 'Volume 02 · Arquitetura e Decisões',
      'vol2.title': 'System Design COSTAR Decisório',
      'vol2.desc': 'Workbench interativo para declarar trade-offs de latência/throughput, simular o Teorema CAP e exportar ADRs em Markdown versionável.',
      'vol2.feat1': 'Simulador visual do Teorema CAP',
      'vol2.feat2': 'Matriz de priorização Pareto 20/80',
      'vol2.feat3': 'Gerador de ADR Markdown para /docs/adr/',
      'vol2.btn': 'Abrir Workbench ⟶',

      'proj1.title': 'Arquitetura Web de Alta Performance',
      'proj1.desc': 'Aplicações web sem frameworks pesados, com Core Web Vitals no percentil 99, CSS com Cascade Layers e renderização ultra-rápida.',
      'proj1.tag': 'Frontend Puro · Zero Runtime',
      'proj2.title': 'Design de Sistemas e Microsserviços',
      'proj2.desc': 'Modelagem orientada a domínio (DDD), isolamento por bounded contexts, estratégias de mensageria assíncrona e resiliência.',
      'proj2.tag': 'Arquitetura · DDD · Microservices',
      'proj3.title': 'DevOps e Infraestrutura Local Imutável',
      'proj3.desc': 'Provisionamento com OpenTofu/Terraform, pipelines CI/CD automatizados no GitHub Actions e ambientes locais via Docker Compose.',
      'proj3.tag': 'Docker · CI/CD · IaC',

      'story.step1_year': 'Fundação e Excelência Web',
      'story.step1_title': 'Domínio de Padrões e Algoritmos',
      'story.step1_desc': 'Início focado em algoritmos, estruturas de dados e domínio profundo das especificações do W3C/ECMA. Construção de aplicações leves, acessíveis e centradas na experiência do usuário.',
      'story.step2_year': 'Engenharia de Escala e Arquitetura',
      'story.step2_title': 'Sistemas Distribuídos e Resiliência',
      'story.step2_desc': 'Atuação em cenários de alta volumetria, desacoplamento de monolitos, modelagem DDD, pipelines de dados assíncronos e governança técnica orientada a ADRs.',
      'story.step3_year': 'Presente e Suíte COSTAR',
      'story.step3_title': 'Liderança Técnica e Ferramentas Decisórias',
      'story.step3_desc': 'Criação de ecossistemas e frameworks conceituais que reduzem o custo de decisão arquitetural, promovendo excelência de Clean Code e alinhamento entre produto e engenharia.',
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
      '404.coffee_msg': 'HTTP 418: I\'m a teapot · Café expresso provisionado com sucesso na memória cache!'
    },
    en: {
      'nav.home': 'Home',
      'nav.roadmap': 'Roadmap',
      'nav.brand': 'pvduk · dev',
      'nav.series': 'Software Engineer',
      'btn.lang': 'EN',
      'btn.theme_toggle': 'Toggle Theme',
      'btn.dev_mode': 'Dev Mode',
      'btn.std_mode': 'Standard Mode',
      'footer.author': 'Handcrafted with Vanilla Web Standards and Clean Architecture.',

      'hub.badge_status': 'Available for projects and consulting',
      'hub.hero_title': 'Software Engineer and<br><em>FullStack C#/React</em>',
      'hub.hero_tagline': 'Specialized in clean architecture, distributed systems, web performance, and pure frontend engineering.',
      'hub.btn_explore': 'Explore Portfolio ↓',
      'hub.btn_contact': 'Get in Touch ⟶',

      'disc.system_design': 'System Design',
      'disc.clean_arch': 'Clean Architecture',
      'disc.web_perf': 'Web Performance (CWV)',
      'disc.avalonia_ui': 'Avalonia UI',
      'disc.sql_nosql': 'SQL and NoSQL',
      'disc.iac_docker': 'IaC and Docker',

      'hub.section_flagship': 'Flagship Project',
      'hub.section_projects': 'Technical Specialties',
      'hub.section_story': 'Project Milestones',
      'hub.section_contact': 'Get in Touch',
      'hub.section_connections': 'Connections',

      'vol1.tag': 'Flagship Project · Process and Case Study',
      'vol1.title': 'Software Engineering and Requirements Roadmap',
      'vol1.desc': 'Structured 8-phase guide with the real FirstStrike Analytics SaaS case study: from business discovery to the Production Gate.',
      'vol1.feat1': 'Intuitive, simple, and rich case study for any user',
      'vol1.feat2': 'C4 Level 1 diagrams, DDD and NoSQL tables',
      'vol1.feat3': 'Real OpenAPI 3.0 specs and Docker Compose environment',
      'vol1.btn': 'Open Interactive Roadmap ⟶',

      'vol2.tag': 'Volume 02 · Architecture and Decisions',
      'vol2.title': 'Decisional System Design COSTAR',
      'vol2.desc': 'Interactive workbench to declare latency/throughput trade-offs, simulate CAP Theorem, and export versionable Markdown ADRs.',
      'vol2.feat1': 'Visual CAP Theorem simulator',
      'vol2.feat2': 'Pareto 20/80 prioritization matrix',
      'vol2.feat3': 'Markdown ADR generator for /docs/adr/',
      'vol2.btn': 'Open Workbench ⟶',

      'proj1.title': 'High-Performance Web Architecture',
      'proj1.desc': 'Web applications crafted without heavy frameworks, achieving 99th percentile Core Web Vitals, CSS Cascade Layers, and ultra-fast rendering.',
      'proj1.tag': 'Pure Frontend · Zero Runtime',
      'proj2.title': 'System Design and Microservices',
      'proj2.desc': 'Domain-Driven Design (DDD), bounded context isolation, asynchronous messaging architectures, and distributed system resilience.',
      'proj2.tag': 'Architecture · DDD · Microservices',
      'proj3.title': 'DevOps and Immutable Local Environments',
      'proj3.desc': 'Infrastructure provisioning with OpenTofu/Terraform, automated GitHub Actions CI/CD pipelines, and unified local Docker Compose stacks.',
      'proj3.tag': 'Docker · CI/CD · IaC',

      'story.step1_year': 'Foundations and Web Excellence',
      'story.step1_title': 'Mastery of Standards and Algorithms',
      'story.step1_desc': 'Early career focused on data structures, algorithms, and in-depth mastery of W3C/ECMA standards. Building lightweight, accessible, and user-centric web applications.',
      'story.step2_year': 'Scale Engineering and Architecture',
      'story.step2_title': 'Distributed Systems and Resilience',
      'story.step2_desc': 'Leading high-volume operations, decoupling monolithic architectures, implementing DDD, asynchronous event pipelines, and ADR-driven technical governance.',
      'story.step3_year': 'Present and COSTAR Suite',
      'story.step3_title': 'Technical Leadership and Decision Tools',
      'story.step3_desc': 'Architecting conceptual ecosystems and frameworks that reduce architectural decision costs, elevating Clean Code practices and aligning product with engineering.',
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
      '404.coffee_msg': 'HTTP 418: I\'m a teapot · Espresso coffee provisioned with zero latency in cache memory!'
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
    flagBR: `<svg width="15" height="11" viewBox="0 0 20 14" fill="none" aria-hidden="true" style="border-radius:2px; flex-shrink:0; display:inline-block; vertical-align:middle;"><rect width="20" height="14" rx="2" fill="#059669"/><polygon points="10,1.8 18.2,7 10,12.2 1.8,7" fill="#F59E0B"/><circle cx="10" cy="7" r="3.2" fill="#1D4ED8"/><path d="M7.1 7.7 Q10 5.6 12.9 6.3" stroke="#FFFFFF" stroke-width="0.75" fill="none" stroke-linecap="round"/><circle cx="10.2" cy="5.2" r="0.28" fill="#FFFFFF"/><circle cx="10" cy="8.2" r="0.28" fill="#FFFFFF"/><circle cx="9.3" cy="7.8" r="0.22" fill="#FFFFFF"/><circle cx="10.7" cy="7.8" r="0.22" fill="#FFFFFF"/><circle cx="10" cy="9.0" r="0.2" fill="#FFFFFF"/></svg>`,
    flagUS: `<svg width="15" height="11" viewBox="0 0 20 14" fill="none" aria-hidden="true" style="border-radius:2px; flex-shrink:0; display:inline-block; vertical-align:middle;"><rect width="20" height="14" rx="2" fill="#B91C1C"/><path d="M0 1.08h20v1.08H0z M0 3.23h20v1.08H0z M0 5.38h20v1.08H0z M0 7.54h20v1.08H0z M0 9.69h20v1.08H0z M0 11.85h20v1.08H0z" fill="#FFFFFF"/><rect width="8.5" height="7.54" rx="1" fill="#1E3A8A"/><circle cx="2" cy="1.9" r="0.6" fill="#FFFFFF"/><circle cx="4.25" cy="1.9" r="0.6" fill="#FFFFFF"/><circle cx="6.5" cy="1.9" r="0.6" fill="#FFFFFF"/><circle cx="3.12" cy="3.77" r="0.6" fill="#FFFFFF"/><circle cx="5.37" cy="3.77" r="0.6" fill="#FFFFFF"/><circle cx="2" cy="5.64" r="0.6" fill="#FFFFFF"/><circle cx="4.25" cy="5.64" r="0.6" fill="#FFFFFF"/><circle cx="6.5" cy="5.64" r="0.6" fill="#FFFFFF"/></svg>`
  };

  // ─── VIEW TRANSITION HELPER (ECMAScript & Web Standards) ───
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
  }

  function toggleLanguage() {
    withViewTransition(() => {
      applyLanguage(currentLang === 'pt' ? 'en' : 'pt');
    });
  }

  window.toggleLanguage = toggleLanguage;

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

    const commandRegistry = {
      help: (isPt) => `
<div class="term-box">
  <div class="term-title" data-i18n="terminal.help_title">${isPt ? 'COMANDOS DISPONÍVEIS:' : 'AVAILABLE COMMANDS:'}</div>
  <div class="term-grid">
    <div><strong class="term-hl">whoami</strong></div><div data-i18n="terminal.help_whoami">${isPt ? 'Exibe perfil e especialidades técnicas' : 'Shows developer profile and core skills'}</div>
    <div><strong class="term-hl">ls</strong> / <strong class="term-hl">projects</strong></div><div data-i18n="terminal.help_projects">${isPt ? 'Lista projetos e artefatos de engenharia' : 'Lists projects and engineering artifacts'}</div>
    <div><strong class="term-hl">story</strong> / <strong class="term-hl">log</strong></div><div data-i18n="terminal.help_story">${isPt ? 'Linha do tempo de carreira e marcos profissionais' : 'Career changelog and milestones'}</div>
    <div><strong class="term-hl">contact</strong></div><div data-i18n="terminal.help_contact">${isPt ? 'Canais diretos de contato e e-mail' : 'Direct contact channels and e-mail'}</div>
    <div><strong class="term-hl">costar</strong></div><div data-i18n="terminal.help_costar">${isPt ? 'Status e links do Framework COSTAR' : 'Status and links of the COSTAR Framework'}</div>
    <div><strong class="term-hl">theme</strong></div><div data-i18n="terminal.help_theme">${isPt ? 'Alterna tema Dark / Light' : 'Toggles Dark / Light theme'}</div>
    <div><strong class="term-hl">lang</strong></div><div data-i18n="terminal.help_lang">${isPt ? 'Alterna idioma PT / EN' : 'Toggles language PT / EN'}</div>
    <div><strong class="term-hl">clear</strong></div><div data-i18n="terminal.help_clear">${isPt ? 'Limpa o console do terminal' : 'Clears terminal console'}</div>
  </div>
</div>`,

      whoami: (isPt) => `
<div class="term-card">
  <div class="term-user-title"><strong data-i18n="terminal.whoami_title">${isPt ? 'pvduk · Senior Software Engineer e FullStack C#/React' : 'pvduk · Senior Software Engineer and FullStack C#/React'}</strong></div>
  <p data-i18n="terminal.whoami_desc">${isPt ? 'Especialista em arquitetura limpa, sistemas distribuídos, performance web e desenvolvimento frontend puro.' : 'Specialized in clean architecture, distributed systems, web performance, and pure frontend engineering.'}</p>
  <div class="term-tags">
    <span class="term-tag" data-i18n="terminal.whoami_tag_ts">TypeScript / Vanilla ES2026</span>
    <span class="term-tag" data-i18n="terminal.whoami_tag_clean">${isPt ? 'Clean Architecture e DDD' : 'Clean Architecture and DDD'}</span>
    <span class="term-tag" data-i18n="terminal.whoami_tag_perf">${isPt ? 'Web Standards e CWV' : 'Web Standards and CWV'}</span>
    <span class="term-tag" data-i18n="terminal.whoami_tag_docker">${isPt ? 'IaC e Docker' : 'IaC and Docker'}</span>
    <span class="term-tag" data-i18n="terminal.whoami_tag_avalonia">Avalonia UI</span>
    <span class="term-tag" data-i18n="terminal.whoami_tag_db">${isPt ? 'SQL e NoSQL' : 'SQL and NoSQL'}</span>
    <span class="term-tag" data-i18n="terminal.whoami_tag_sd">System Design</span>
  </div>
  <div style="margin-top:8px; color:var(--color-green); font-weight:600;" data-i18n="terminal.whoami_status">
    ${isPt ? '● Status: Disponível para projetos e consultoria técnica' : '● Status: Available for projects and technical consulting'}
  </div>
</div>`,

      projects: (isPt) => `
<div class="term-table-wrap">
  <div class="term-title" data-i18n="terminal.projects_title">${isPt ? '[ARTEFATOS E PROJETOS]' : '[ARTIFACTS AND PROJECTS]'}</div>
  <table class="term-table">
    <thead>
      <tr>
        <th data-i18n="terminal.th_name">${isPt ? 'NOME' : 'NAME'}</th>
        <th data-i18n="terminal.th_stack">STACK</th>
        <th data-i18n="terminal.th_type">${isPt ? 'TIPO' : 'TYPE'}</th>
        <th data-i18n="terminal.th_link">${isPt ? 'ACESSO' : 'ACCESS'}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj1_name">${isPt ? '01 · Roadmap de Requisitos' : '01 · Requirements Roadmap'}</strong></td>
        <td data-i18n="terminal.proj1_stack">HTML5 / Vanilla JS / C# .NET 10 / MongoDB NoSQL</td>
        <td data-i18n="terminal.proj1_type">${isPt ? 'Processo e Estudo de Caso' : 'Process and Case Study'}</td>
        <td><a href="roadmap-requisitos.html" class="term-link" data-i18n="terminal.proj1_link">${isPt ? '[Acessar] ➔' : '[Open] ➔'}</a></td>
      </tr>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj2_name">${isPt ? 'Web Perf e Zero-Runtime' : 'Web Perf and Zero-Runtime'}</strong></td>
        <td data-i18n="terminal.proj2_stack">CSS Cascade Layers / ES2026</td>
        <td data-i18n="terminal.proj2_type">${isPt ? 'Kit de Arquitetura' : 'Architecture Kit'}</td>
        <td><span class="term-dim" data-i18n="terminal.proj2_status">${isPt ? 'Produção' : 'Live'}</span></td>
      </tr>
      <tr>
        <td><strong class="term-hl" data-i18n="terminal.proj3_name">${isPt ? 'Clean Architecture e DDD' : 'Clean Architecture and DDD'}</strong></td>
        <td data-i18n="terminal.proj3_stack">C# .NET 10 / MongoDB / Docker</td>
        <td data-i18n="terminal.proj3_type">${isPt ? 'Boilerplate de Padrões' : 'Pattern Boilerplate'}</td>
        <td><span class="term-dim" data-i18n="terminal.proj3_status">${isPt ? 'Produção' : 'Live'}</span></td>
      </tr>
    </tbody>
  </table>
</div>`,

      story: (isPt) => `
<div class="term-box">
  <div class="term-title" data-i18n="terminal.story_title">${isPt ? '[LOG DE CARREIRA E MARCOS DE ENGENHARIA]' : '[CAREER LOG AND ENGINEERING MILESTONES]'}</div>
  <div class="term-log-entry">
    <span class="term-hash">c057a01</span> <span class="term-branch">(HEAD -> main)</span> <strong data-i18n="terminal.story_m3_role">${isPt ? 'Presente:' : 'Present:'}</strong> <span data-i18n="terminal.story_m3_desc">${isPt ? 'Liderança Técnica e Suíte Decisória COSTAR' : 'Technical Leadership and Decisional COSTAR Suite'}</span>
  </div>
  <div class="term-log-entry">
    <span class="term-hash">a94f12b</span> <strong data-i18n="terminal.story_m2_role">${isPt ? 'Engenharia de Escala:' : 'Scale Era:'}</strong> <span data-i18n="terminal.story_m2_desc">${isPt ? 'Sistemas Distribuídos, DDD, Resiliência e Microsserviços' : 'Distributed Systems, DDD, Resilience and Microservices'}</span>
  </div>
  <div class="term-log-entry">
    <span class="term-hash">38e09f4</span> <strong data-i18n="terminal.story_m1_role">${isPt ? 'Fundação:' : 'Foundations:'}</strong> <span data-i18n="terminal.story_m1_desc">${isPt ? 'Algoritmos, W3C Standards, Vanilla Web e Performance' : 'Algorithms, W3C Standards, Vanilla Web and Performance'}</span>
  </div>
</div>`,

      contact: (isPt) => `
<div class="term-card">
  <div class="term-title" data-i18n="terminal.contact_title">${isPt ? '[CANAIS DE CONTATO]' : '[CONTACT CHANNELS]'}</div>
  <p data-i18n="terminal.contact_desc">${isPt ? 'Pronto para colaborar em projetos de alto impacto e consultoria técnica:' : 'Ready to collaborate on high-impact projects and technical consulting:'}</p>
  <div style="margin: 8px 0;">
    <div><strong data-i18n="terminal.contact_email_label">${isPt ? 'E-mail:' : 'E-mail:'}</strong> <code class="inline-code">paulo.dukven@gmail.com</code> <button type="button" class="term-copy-btn" onclick="navigator.clipboard.writeText('paulo.dukven@gmail.com');alert('${isPt ? '✓ E-mail Copiado!' : '✓ E-mail Copied!'}')" data-i18n="terminal.contact_copy_btn">${isPt ? '[Copiar]' : '[Copy]'}</button></div>
    <div><strong data-i18n="terminal.contact_github_label">${isPt ? 'GitHub:' : 'GitHub:'}</strong> <a href="https://github.com/pvduk" target="_blank" rel="noopener noreferrer" class="term-link">github.com/pvduk</a></div>
    <div><strong data-i18n="terminal.contact_linkedin_label">${isPt ? 'LinkedIn:' : 'LinkedIn:'}</strong> <a href="https://linkedin.com/in/pvduk" target="_blank" rel="noopener noreferrer" class="term-link">linkedin.com/in/pvduk</a></div>
  </div>
  <div class="term-dim" data-i18n="terminal.contact_sla">● ${isPt ? 'Tempo de resposta: < 24h úteis' : 'Response time: < 24 business hours'}</div>
</div>`,

      costar: (isPt) => `
<div class="term-box">
  <div class="term-title" data-i18n="terminal.costar_title">${isPt ? '[FRAMEWORK COSTAR · STATUS REPORT]' : '[COSTAR FRAMEWORK · STATUS REPORT]'}</div>
  <div><strong data-i18n="terminal.costar_item1">${isPt ? '01 · Roadmap de Requisitos:' : '01 · Requirements Roadmap:'}</strong> <span style="color:var(--color-green)" data-i18n="terminal.costar_status1">${isPt ? '[ATIVO / OPERACIONAL] ➔' : '[ACTIVE / OPERATIONAL] ➔'}</span> <a href="roadmap-requisitos.html" class="term-link">roadmap-requisitos.html</a></div>
</div>`,

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
        appendLine(`zsh: command not found: <span style="color:var(--color-red);">${escapeHtml(cmdRaw)}</span>. ${isPt ? 'Digite "help" para ver os comandos disponíveis.' : 'Type "help" to list available commands.'}`, 'error');
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

    // ─── SMART EMAIL COMPOSER & WEB3FORMS (ASYNC FETCH) ───
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
    initPWA();
  }

  // ═════════════════════════════════════════════════════════════════════
  // 8. PROGRESSIVE WEB APP (PWA) SERVICE WORKER REGISTRATION
  // ═════════════════════════════════════════════════════════════════════
  function initPWA() {
    if ('serviceWorker' in navigator && window.location.protocol && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('[PWA] Nova versão disponível. Cache pronto para uso offline.');
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
