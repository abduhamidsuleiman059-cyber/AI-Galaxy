/* ============================================
   AI GALAXY — API & DATA LAYER
   api.js
   ============================================ */

const API = (() => {

  /* ---- Base paths ---- */
  const DATA_PATH = 'data/';

  /* ---- Generic fetch helper ---- */
  async function fetchJSON(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
      return await res.json();
    } catch (err) {
      console.warn(`[AI Galaxy API] Failed to fetch ${url}:`, err.message);
      return null;
    }
  }

  /* ==========================================
     DATA — Local JSON files
     ========================================== */

  /** Get all AI tools */
  async function getTools() {
    return await fetchJSON(`${DATA_PATH}tools.json`) || [];
  }

  /** Get all categories */
  async function getCategories() {
    return await fetchJSON(`${DATA_PATH}categories.json`) || [];
  }

  /** Filter tools by category */
  async function getToolsByCategory(category) {
    const tools = await getTools();
    if (!category || category === 'all') return tools;
    return tools.filter(t =>
      t.category?.toLowerCase() === category.toLowerCase()
    );
  }

  /** Search tools by keyword */
  async function searchTools(query) {
    const tools = await getTools();
    if (!query) return tools;
    const q = query.toLowerCase();
    return tools.filter(t =>
      t.name?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q) ||
      t.tags?.some(tag => tag.toLowerCase().includes(q))
    );
  }

  /** Get single tool by ID or slug */
  async function getToolById(id) {
    const tools = await getTools();
    return tools.find(t => t.id === id || t.slug === id) || null;
  }

  /** Get featured/trending tools */
  async function getTrendingTools(limit = 6) {
    const tools = await getTools();
    return tools
      .filter(t => t.trending || t.featured)
      .slice(0, limit);
  }

  /* ==========================================
     NEWSLETTER — Formspree (free, no backend)
     Replace YOUR_FORM_ID with your Formspree ID
     ========================================== */
  async function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    /* -- Using Formspree endpoint (swap YOUR_FORM_ID) -- */
    const FORM_ID = 'YOUR_FORM_ID';
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) return { success: true,  message: 'Subscribed! Thank you.' };
      return        { success: false, message: 'Something went wrong. Try again.' };
    } catch {
      return { success: false, message: 'Network error. Check your connection.' };
    }
  }

  /* ==========================================
     CONTACT FORM
     ========================================== */
  async function sendContactForm({ name, email, message }) {
    const FORM_ID = 'YOUR_FORM_ID';
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) return { success: true,  message: 'Message sent! We\'ll reply soon.' };
      return        { success: false, message: 'Could not send message. Try again.' };
    } catch {
      return { success: false, message: 'Network error. Check your connection.' };
    }
  }

  /* ==========================================
     URL PARAMS HELPER
     ========================================== */

  /** Get query param from URL: API.getParam('q') */
  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key) || '';
  }

  /* ==========================================
     PUBLIC INTERFACE
     ========================================== */
  return {
    getTools,
    getCategories,
    getToolsByCategory,
    searchTools,
    getToolById,
    getTrendingTools,
    subscribeNewsletter,
    sendContactForm,
    getParam,
  };

})();

/* Make available globally */
window.API = API;