/* ============================================
   AI GALAXY — LEARN PAGE JS
   learnpage.js  (Learn page only — does not touch
   any other page's script)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hero search: redirect to Trending with query ---- */
  const searchForm  = document.getElementById('lr-search-form');
  const searchInput = document.getElementById('lr-search-input');

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) {
      window.location.href = `trending.html?search=${encodeURIComponent(q)}`;
    }
  });

  /* ---- Popular tags: fill search input on click ---- */
  document.querySelectorAll('.lr-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const value = tag.dataset.tag || tag.textContent.trim();
      searchInput.value = value;
      searchInput.focus();
    });
  });

  /* ---- Newsletter form ---- */
  const newsletterForm = document.getElementById('lr-newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim()) {
      if (typeof window.showToast === 'function') {
        window.showToast('Umejiunga! Asante kwa kufuatilia AI Galaxy 🚀');
      }
      newsletterForm.reset();
    }
  });

  document.querySelectorAll('.lr-course-card .btn--primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast('This learning path is opening soon.');
      }
    });
  });

  /* ============================================
     LATEST AI TUTORIALS — YouTube modal player
     ============================================ */
  const videoModal  = document.getElementById('lr-video-modal');
  const videoIframe = document.getElementById('lr-video-modal__iframe');
  const tutorialCards = document.querySelectorAll('.lr-tutorial-card[data-video]');

  if (!videoModal) {
    console.warn('[AI Galaxy] #lr-video-modal haipo kwenye page — modal ya video haitafanya kazi. Angalia kama HTML ya modal imebandikwa kwenye learn.html.');
  }

  function openVideoModal(videoId) {
    if (!videoId || !videoModal || !videoIframe) return;
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal || !videoIframe) return;
    videoModal.classList.remove('is-open');
    videoIframe.src = ''; // stop playback
    document.body.style.overflow = '';
  }

  tutorialCards.forEach((card) => {
    card.addEventListener('click', () => openVideoModal(card.dataset.video));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openVideoModal(card.dataset.video);
      }
    });
  });

  videoModal?.querySelectorAll('[data-close]').forEach((el) => {
    el.addEventListener('click', closeVideoModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.classList.contains('is-open')) {
      closeVideoModal();
    }
  });

});