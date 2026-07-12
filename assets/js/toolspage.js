
/* ============================================
   AI GALAXY — TOOLS PAGE
   toolspage.js
   Rendering + filter logic for tools.html only.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.getElementById('tl-all-grid');
  if (!grid) return; // hii JS ni ya tools.html tu

  /* ---- Full tools dataset (static — tools.json bado ni ndogo) ---- */
  const iconSvg = (path) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  const ALL_TOOLS = [
    { name: 'ChatGPT', icon: iconSvg('<path d="M8 10h8"/><path d="M8 14h5"/><rect x="5" y="3" width="14" height="18" rx="3"/>'), category: 'chatbots', badge: 'Popular', desc: 'Advanced AI chatbot for conversations, questions, and creative writing.', price: 'Free • Paid', rating: 4.9, color: 'rgba(16,163,127,.18)' },
    { name: 'Midjourney', icon: iconSvg('<path d="M4 7h16"/><path d="M7 4v16"/><path d="M17 4v16"/><path d="M4 17h16"/>'), category: 'image', badge: 'Popular', desc: 'AI image generator that creates stunning visuals from text prompts.', price: 'Paid', rating: 4.8, color: 'rgba(168,85,247,.18)' },
    { name: 'Notion AI', icon: iconSvg('<path d="M7 4h10"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/><rect x="4" y="2" width="16" height="20" rx="3"/>'), category: 'productivity', badge: 'Popular', desc: 'AI assistant integrated in Notion to write, summarize and organize better.', price: 'Free • Paid', rating: 4.7, color: 'rgba(255,255,255,.1)' },
    { name: 'Claude', icon: iconSvg('<path d="M6 8l-2 4 2 4"/><path d="M18 8l2 4-2 4"/><path d="M9 4l3 16"/><path d="M15 4l-3 16"/>'), category: 'chatbots', badge: 'Popular', desc: 'AI assistant by Anthropic focused on helpful, honest and safe conversations.', price: 'Free • Paid', rating: 4.8, color: 'rgba(124,58,237,.18)' },
    { name: 'Hugging Face', icon: iconSvg('<path d="M8 8c0-2 2-3 4-3s4 1 4 3"/><path d="M8 16c0 2 2 3 4 3s4-1 4-3"/><path d="M6 12h12"/>'), category: 'research', badge: 'Popular', desc: 'Explore and build machine learning models and AI applications.', price: 'Free', rating: 4.7, color: 'rgba(255,193,7,.18)' },
    { name: 'GitHub Copilot', icon: iconSvg('<path d="M8 5l8 7-8 7"/><path d="M16 5l-8 7 8 7"/>'), category: 'code', badge: 'Popular', desc: 'AI pair programmer that autocompletes code right in your editor.', price: 'Paid', rating: 4.6, color: 'rgba(37,99,235,.18)' },
    { name: 'Runway', icon: iconSvg('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M10 9l4 3-4 3z"/>'), category: 'video', badge: 'New', desc: 'Generate and edit video with AI — text-to-video and motion tools.', price: 'Free • Paid', rating: 4.5, color: 'rgba(6,182,212,.18)' },
    { name: 'Perplexity', icon: iconSvg('<circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/>'), category: 'productivity', badge: 'Popular', desc: 'AI-powered answer engine that searches the web for you.', price: 'Free • Paid', rating: 4.6, color: 'rgba(6,182,212,.18)' },
    { name: 'ElevenLabs', icon: iconSvg('<path d="M8 9h8"/><path d="M8 13h8"/><path d="M6 6h12v12H6z"/>'), category: 'audio', badge: 'New', desc: 'Realistic AI voice generation and text-to-speech.', price: 'Free • Paid', rating: 4.7, color: 'rgba(236,72,153,.18)' },
    { name: 'Canva AI', icon: iconSvg('<path d="M6 8h12"/><path d="M8 4h8"/><path d="M8 20h8"/><path d="M10 6v12"/>'), category: 'image', badge: 'Popular', desc: 'Design anything with AI — from posts to presentations.', price: 'Free • Paid', rating: 4.7, color: 'rgba(124,58,237,.18)' },
    { name: 'DeepL', icon: iconSvg('<path d="M7 7h7"/><path d="M7 12h10"/><path d="M7 17h5"/><path d="M14 17c2 0 4-1 4-4"/>'), category: 'productivity', badge: null, desc: 'AI translation that reads more natural than the competition.', price: 'Free • Paid', rating: 4.6, color: 'rgba(5,150,105,.18)' },
    { name: 'Cursor', icon: iconSvg('<path d="M5 5h14"/><path d="M5 19h14"/><path d="M8 5v14"/><path d="M16 5v14"/>'), category: 'code', badge: 'New', desc: 'AI-first code editor built for pair programming with AI.', price: 'Free • Paid', rating: 4.7, color: 'rgba(37,99,235,.18)' },
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
          <div class="tl-tool-card__icon" style="background:${t.color};">${t.icon}</div>
          ${t.badge ? `<span class="tl-tool-card__badge">${t.badge}</span>` : ''}
        </div>
        <div class="tl-tool-card__name">${t.name}</div>
        <p class="tl-tool-card__desc">${t.desc}</p>
        <div class="tl-tool-card__footer">
          <span>${t.price}</span>
          <span class="tl-tool-card__rating">★ ${t.rating}</span>
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