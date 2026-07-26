/* ============================================
   AI GALAXY — TOOLS PAGE
   toolspage.js
   Rendering + filter logic for tools.html only.
   Icons match the brand icon language already
   established on trending.html (same paths reused
   for ChatGPT / Claude / Midjourney / Runway /
   Perplexity / ElevenLabs so the whole site reads
   as one consistent icon system).
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.getElementById('tl-all-grid');
  if (!grid) return; // hii JS ni ya tools.html tu

  /* ---- Full tools dataset (static — tools.json bado ni ndogo) ---- */
  const iconSvg = (path, filled) => `<svg viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

  const ALL_TOOLS = [
    { name: 'ChatGPT', icon: iconSvg('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'), category: 'chatbots', badge: 'Popular', desc: 'Advanced AI chatbot for conversations, questions, and creative writing.', price: 'Free • Paid', rating: 4.9, color: 'rgba(16,163,127,.18)', accent: '#10a37f' },
    { name: 'Midjourney', icon: iconSvg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>'), category: 'image', badge: 'Popular', desc: 'AI image generator that creates stunning visuals from text prompts.', price: 'Paid', rating: 4.8, color: 'rgba(236,72,153,.18)', accent: '#ec4899' },
    { name: 'Notion AI', icon: iconSvg('<path d="M7 4h10"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/><rect x="4" y="2" width="16" height="20" rx="3"/>'), category: 'productivity', badge: 'Popular', desc: 'AI assistant integrated in Notion to write, summarize and organize better.', price: 'Free • Paid', rating: 4.7, color: 'rgba(255,255,255,.1)', accent: '#e5e7eb' },
    { name: 'Claude', icon: iconSvg('<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>'), category: 'chatbots', badge: 'Popular', desc: 'AI assistant by Anthropic focused on helpful, honest and safe conversations.', price: 'Free • Paid', rating: 4.8, color: 'rgba(168,85,247,.18)', accent: '#a855f7' },
    { name: 'Hugging Face', icon: iconSvg('<path d="M8 8c0-2 2-3 4-3s4 1 4 3"/><path d="M8 16c0 2 2 3 4 3s4-1 4-3"/><path d="M6 12h12"/>'), category: 'research', badge: 'Popular', desc: 'Explore and build machine learning models and AI applications.', price: 'Free', rating: 4.7, color: 'rgba(245,158,11,.18)', accent: '#f59e0b' },
    { name: 'GitHub Copilot', icon: iconSvg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'), category: 'code', badge: 'Popular', desc: 'AI pair programmer that autocompletes code right in your editor.', price: 'Paid', rating: 4.6, color: 'rgba(37,99,235,.18)', accent: '#3b82f6' },
    { name: 'Runway', icon: iconSvg('<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>'), category: 'video', badge: 'New', desc: 'Generate and edit video with AI — text-to-video and motion tools.', price: 'Free • Paid', rating: 4.5, color: 'rgba(6,182,212,.18)', accent: '#22d3ee' },
    { name: 'Perplexity', icon: iconSvg('<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'), category: 'productivity', badge: 'Popular', desc: 'AI-powered answer engine that searches the web for you.', price: 'Free • Paid', rating: 4.6, color: 'rgba(6,182,212,.18)', accent: '#06b6d4' },
    { name: 'ElevenLabs', icon: iconSvg('<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>'), category: 'audio', badge: 'New', desc: 'Realistic AI voice generation and text-to-speech.', price: 'Free • Paid', rating: 4.7, color: 'rgba(245,158,11,.18)', accent: '#f59e0b' },
    { name: 'Canva AI', icon: iconSvg('<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'), category: 'image', badge: 'Popular', desc: 'Design anything with AI — from posts to presentations.', price: 'Free • Paid', rating: 4.7, color: 'rgba(124,58,237,.18)', accent: '#7c3aed' },
    { name: 'DeepL', icon: iconSvg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z"/>'), category: 'productivity', badge: null, desc: 'AI translation that reads more natural than the competition.', price: 'Free • Paid', rating: 4.6, color: 'rgba(5,150,105,.18)', accent: '#10b981' },
    { name: 'Cursor', icon: iconSvg('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'), category: 'code', badge: 'New', desc: 'AI-first code editor built for pair programming with AI.', price: 'Free • Paid', rating: 4.7, color: 'rgba(37,99,235,.18)', accent: '#3b82f6' },
  ];

  const FEATURED = ALL_TOOLS.slice(0, 5);

  /* ---- Render Featured Tools ---- */
  const featuredGrid = document.getElementById('tl-featured-grid');
  function renderFeatured() {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = FEATURED.map(t => toolCardHTML(t)).join('');
  }

  /* ---- Tool card HTML ---- */
  function toolCardHTML(t) {
    return `
      <div class="tl-tool-card" data-cat="${t.category}">
        <div class="tl-tool-card__top">
          <div class="tl-tool-card__icon" style="background:${t.color};color:${t.accent};">${t.icon}</div>
          ${t.badge ? `<span class="tl-tool-card__badge">${t.badge}</span>` : ''}
        </div>
        <div class="tl-tool-card__name">${t.name}</div>
        <p class="tl-tool-card__desc">${t.desc}</p>
        <div class="tl-tool-card__footer">
          <span>${t.price}</span>
          <span class="tl-tool-card__rating"><svg class="icon" width="12" height="12"><use href="#icon-star"/></svg>${t.rating}</span>
        </div>
      </div>`;
  }

  /* ---- Render All Tools grid (filtered) ---- */
  let activeCategory = 'all';
  let activeQuery = '';

  function renderGrid() {
    let list = ALL_TOOLS;
    if (activeCategory !== 'all') {
      list = list.filter(t => t.category === activeCategory);
    }
    if (activeQuery) {
      const q = activeQuery.toLowerCase();
      list = list.filter(t =>
        t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
      );
    }
    grid.innerHTML = list.length
      ? list.map(t => toolCardHTML(t)).join('')
      : `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:2rem 0;">Hakuna tools zilizopatikana.</p>`;
    grid.classList.add('reveal-stagger', 'visible');
  }

  /* ---- Category filter pills (tr-filter-btn reused) ---- */
  const filterBtns = document.querySelectorAll('.tl-all-filters [data-cat]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('tr-filter-btn--active'));
      btn.classList.add('tr-filter-btn--active');
      activeCategory = btn.dataset.cat;
      renderGrid();
    });
  });

  /* ---- Category cards in "Browse by Category" also filter the grid ---- */
  document.querySelectorAll('.tl-category-grid .category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = card.dataset.cat;
      if (!cat) return;
      activeCategory = cat;
      filterBtns.forEach(b => b.classList.toggle('tr-filter-btn--active', b.dataset.cat === cat));
      renderGrid();
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---- Hero search + top search bar filters the grid ---- */
  const searchInput = document.getElementById('tl-search-input');
  const searchBtn = document.getElementById('tl-search-btn');
  function runSearch() {
    activeQuery = searchInput ? searchInput.value.trim() : '';
    renderGrid();
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  searchBtn?.addEventListener('click', runSearch);
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });

  /* ---- Sort select ---- */
  const sortSelect = document.getElementById('tl-sort-select');
  sortSelect?.addEventListener('change', () => {
    const val = sortSelect.value;
    if (val === 'rating') ALL_TOOLS.sort((a, b) => b.rating - a.rating);
    if (val === 'name') ALL_TOOLS.sort((a, b) => a.name.localeCompare(b.name));
    renderGrid();
  });

  renderFeatured();
  renderGrid();

});