/**
 * COSTAR · BLOG ENGINE (Vanilla ES2026 Module)
 * Client-side manifest consumer, tag filter, series navigator & localized renderer.
 * Zero external dependencies.
 */

(function () {
  'use strict';

  let rawManifest = { series: [], posts: [] };
  let allPosts = [];
  let seriesList = [];
  let publishedPosts = [];
  let currentTag = 'all';

  const gridEl = document.getElementById('blogPostsGrid');
  const tagsFilterEl = document.getElementById('blogTagsFilter');
  const emptyStateEl = document.getElementById('blogEmptyState');
  const errorStateEl = document.getElementById('blogErrorState');
  const seriesNavEl = document.getElementById('seriesNav');

  function getActiveLang() {
    if (typeof window.getCurrentLanguage === 'function') {
      return window.getCurrentLanguage();
    }
    try {
      const saved = localStorage.getItem('costar_preferred_lang');
      if (saved === 'pt' || saved === 'en') return saved;
    } catch (e) {}
    const docLang = document.documentElement.getAttribute('data-lang');
    if (docLang === 'pt' || docLang === 'en') return docLang;
    const nav = (navigator.language || '').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }

  function getI18nText(key, fallback) {
    if (typeof window.getDictionary === 'function') {
      const dict = window.getDictionary(getActiveLang());
      if (dict && dict[key]) return dict[key];
    }
    return fallback;
  }

  function formatDate(isoDate, lang) {
    try {
      const [year, month, day] = isoDate.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return isoDate;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ═════════════════════════════════════════════════════════════════════
  // 1. MODO INDEX (LISTAGEM & FILTROS)
  // ═════════════════════════════════════════════════════════════════════
  function renderTagsFilter() {
    if (!tagsFilterEl) return;

    const allTags = new Set();
    publishedPosts.forEach(post => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach(t => allTags.add(t));
      }
    });

    const lang = getActiveLang();
    const allLabel = getI18nText('blog.all', lang === 'pt' ? 'Todas' : 'All');

    let html = `<li><button type="button" class="tag-pill-btn${currentTag === 'all' ? ' active' : ''}" data-tag="all">${escapeHtml(allLabel)}</button></li>`;

    Array.from(allTags).sort().forEach(tag => {
      const isActive = currentTag === tag ? ' active' : '';
      html += `<li><button type="button" class="tag-pill-btn${isActive}" data-tag="${escapeHtml(tag)}">#${escapeHtml(tag)}</button></li>`;
    });

    tagsFilterEl.innerHTML = html;

    tagsFilterEl.querySelectorAll('.tag-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tag = e.currentTarget.getAttribute('data-tag');
        currentTag = tag;
        renderTagsFilter();
        renderPosts();
      });
    });
  }

  function renderPosts() {
    if (!gridEl) return;

    const lang = getActiveLang();
    const filtered = publishedPosts.filter(post => {
      if (currentTag === 'all') return true;
      return Array.isArray(post.tags) && post.tags.includes(currentTag);
    });

    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
      if (errorStateEl) errorStateEl.style.display = 'none';
      return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';
    if (errorStateEl) errorStateEl.style.display = 'none';

    const readingTimeSuffix = getI18nText('blog.reading_time', lang === 'pt' ? 'min de leitura' : 'min read');
    const readMoreText = getI18nText('blog.read_more', lang === 'pt' ? 'Ler artigo ⟶' : 'Read article ⟶');
    const seriesLabel = getI18nText('series.label', lang === 'pt' ? 'Série' : 'Series');
    const partWord = lang === 'pt' ? 'Parte' : 'Part';

    gridEl.innerHTML = filtered.map(post => {
      const title = (post.title && (post.title[lang] || post.title.pt || post.title.en)) || post.slug;
      const desc = (post.description && (post.description[lang] || post.description.pt || post.description.en)) || '';
      const formattedDate = formatDate(post.date, lang);
      const tagsHtml = (post.tags || []).map(t => `<li class="post-tag">#${escapeHtml(t)}</li>`).join('');
      
      const seriesBadgeHtml = (post.series && post.series.id && post.series.part)
        ? `<span class="post-series-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            ${escapeHtml(seriesLabel)} · ${escapeHtml(partWord)} ${escapeHtml(post.series.part)}
          </span>`
        : '';

      return `
        <article class="post-card">
          <div class="post-card-meta">
            <time class="post-date" datetime="${escapeHtml(post.date)}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${escapeHtml(formattedDate)}
            </time>
            <div class="post-card-meta-right">
              ${seriesBadgeHtml}
              <span class="post-reading-time">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${escapeHtml(post.readingTime || 5)} ${escapeHtml(readingTimeSuffix)}
              </span>
            </div>
          </div>

          <h2 class="post-card-title">
            <a href="${escapeHtml(post.file || '#')}">${escapeHtml(title)}</a>
          </h2>

          <p class="post-card-desc">${escapeHtml(desc)}</p>

          <ul class="post-card-tags" aria-label="Tags do artigo">
            ${tagsHtml}
          </ul>

          <div class="post-card-footer">
            <a href="${escapeHtml(post.file || '#')}" class="post-read-link" aria-label="${escapeHtml(title)} - ${escapeHtml(readMoreText)}">
              <span>${escapeHtml(readMoreText)}</span>
            </a>
          </div>
        </article>
      `;
    }).join('');

    // Torna cada card inteiramente interativo e clicável
    gridEl.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const link = card.querySelector('.post-card-title a');
        if (link && link.getAttribute('href') && link.getAttribute('href') !== '#') {
          window.location.href = link.getAttribute('href');
        }
      });
    });
  }

  // ═════════════════════════════════════════════════════════════════════
  // 2. MODO POST (NAVEGAÇÃO DE SÉRIE EM ASIDE#SERIESNAV)
  // ═════════════════════════════════════════════════════════════════════
  function renderSeriesNav() {
    if (!seriesNavEl) return;

    const currentSlug = document.body.getAttribute('data-post-slug');
    if (!currentSlug) {
      seriesNavEl.hidden = true;
      return;
    }

    const currentPost = allPosts.find(p => p.slug === currentSlug);
    if (!currentPost || !currentPost.series || !currentPost.series.id) {
      seriesNavEl.hidden = true;
      return;
    }

    const seriesId = currentPost.series.id;
    const seriesRecord = seriesList.find(s => s.id === seriesId) || { title: {}, description: {} };
    const seriesPosts = allPosts
      .filter(p => p.series && p.series.id === seriesId)
      .sort((a, b) => (a.series.part || 0) - (b.series.part || 0));

    if (seriesPosts.length === 0) {
      seriesNavEl.hidden = true;
      return;
    }

    const currentPart = currentPost.series.part;
    const totalParts = seriesPosts.length;
    const lang = getActiveLang();

    const seriesTitle = (seriesRecord.title && (seriesRecord.title[lang] || seriesRecord.title.pt || seriesRecord.title.en)) || seriesId;
    const seriesDesc = (seriesRecord.description && (seriesRecord.description[lang] || seriesRecord.description.pt || seriesRecord.description.en)) || '';
    const seriesLabel = getI18nText('series.label', lang === 'pt' ? 'Série' : 'Series');
    const partOfText = getI18nText('series.part_of', lang === 'pt' ? 'Parte {part} de {total}' : 'Part {part} of {total}')
      .replace('{part}', currentPart)
      .replace('{total}', totalParts);
    const prevLabel = getI18nText('series.previous', lang === 'pt' ? '← Anterior' : '← Previous');
    const nextLabel = getI18nText('series.next', lang === 'pt' ? 'Próxima →' : 'Next →');
    const upcomingLabel = getI18nText('series.upcoming', lang === 'pt' ? 'em breve' : 'coming soon');

    // Partes anterior e próxima
    const prevPost = seriesPosts
      .filter(p => p.series.part < currentPart && p.published === true)
      .pop();

    const nextPost = seriesPosts.find(p => p.series.part > currentPart);

    // Renderiza lista de partes
    const partsListHtml = seriesPosts.map(p => {
      const partNum = p.series.part;
      const partTitle = (p.title && (p.title[lang] || p.title.pt || p.title.en)) || p.slug;
      const relFile = p.file ? p.file.replace(/^posts\//, '') : '#';

      if (partNum === currentPart) {
        return `
          <li class="series-part-item active" aria-current="step">
            <span class="series-part-num">${partNum}</span>
            <span class="series-part-title">${escapeHtml(partTitle)}</span>
          </li>
        `;
      }

      if (p.published === true) {
        return `
          <li class="series-part-item">
            <a href="${escapeHtml(relFile)}" class="series-part-link">
              <span class="series-part-num">${partNum}</span>
              <span class="series-part-title">${escapeHtml(partTitle)}</span>
            </a>
          </li>
        `;
      }

      return `
        <li class="series-part-item disabled">
          <span class="series-part-disabled">
            <span class="series-part-num">${partNum}</span>
            <span class="series-part-title">${escapeHtml(partTitle)}</span>
            <span class="series-upcoming-chip">${escapeHtml(upcomingLabel)}</span>
          </span>
        </li>
      `;
    }).join('');

    // Botões de navegação inferior
    const prevBtnHtml = prevPost
      ? `<a href="${escapeHtml(prevPost.file.replace(/^posts\//, ''))}" class="series-nav-btn prev" aria-label="${escapeHtml(prevLabel)}: ${(prevPost.title && (prevPost.title[lang] || prevPost.title.pt)) || ''}">
           ${escapeHtml(prevLabel)}
         </a>`
      : `<span class="series-nav-btn disabled" aria-disabled="true">${escapeHtml(prevLabel)}</span>`;

    let nextBtnHtml = '';
    if (nextPost && nextPost.published === true) {
      nextBtnHtml = `<a href="${escapeHtml(nextPost.file.replace(/^posts\//, ''))}" class="series-nav-btn next" aria-label="${escapeHtml(nextLabel)}: ${(nextPost.title && (nextPost.title[lang] || nextPost.title.pt)) || ''}">
                       ${escapeHtml(nextLabel)}
                     </a>`;
    } else if (nextPost) {
      nextBtnHtml = `<span class="series-nav-btn disabled" aria-disabled="true">${escapeHtml(nextLabel)} (${escapeHtml(upcomingLabel)})</span>`;
    } else {
      nextBtnHtml = `<span class="series-nav-btn disabled" aria-disabled="true">${escapeHtml(nextLabel)}</span>`;
    }

    seriesNavEl.innerHTML = `
      <div class="series-nav-box">
        <div class="series-nav-header">
          <div class="series-nav-badge-wrap">
            <span class="series-nav-badge">${escapeHtml(seriesLabel)}</span>
            <span class="series-nav-progress">${escapeHtml(partOfText)}</span>
          </div>
          <h3 class="series-nav-title">${escapeHtml(seriesTitle)}</h3>
          ${seriesDesc ? `<p class="series-nav-desc">${escapeHtml(seriesDesc)}</p>` : ''}
        </div>

        <ol class="series-parts-list" aria-label="Todas as partes da série">
          ${partsListHtml}
        </ol>

        <div class="series-nav-footer">
          ${prevBtnHtml}
          ${nextBtnHtml}
        </div>
      </div>
    `;

    seriesNavEl.removeAttribute('hidden');
    seriesNavEl.hidden = false;
  }

  // ═════════════════════════════════════════════════════════════════════
  // 3. CARREGAMENTO E INICIALIZAÇÃO
  // ═════════════════════════════════════════════════════════════════════
  async function loadPostsData() {
    try {
      const manifestUrl = new URL('../../data/posts.json', import.meta.url).href;
      const response = await fetch(manifestUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      rawManifest = data;
      allPosts = Array.isArray(data) ? data : (Array.isArray(data.posts) ? data.posts : []);
      seriesList = Array.isArray(data.series) ? data.series : [];

      publishedPosts = allPosts
        .filter(p => p && p.published === true)
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

      renderTagsFilter();
      renderPosts();
      renderSeriesNav();
    } catch (err) {
      console.warn('[Blog Engine] Não foi possível carregar posts.json:', err);
      if (gridEl) gridEl.innerHTML = '';
      if (emptyStateEl) emptyStateEl.style.display = 'none';
      if (errorStateEl) errorStateEl.style.display = 'block';
      if (seriesNavEl) seriesNavEl.hidden = true;
    }
  }

  window.addEventListener('costar:languagechange', () => {
    renderTagsFilter();
    renderPosts();
    renderSeriesNav();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPostsData);
  } else {
    loadPostsData();
  }
})();
