/* ============================================
   AI GALAXY — COMMUNITY PAGE JS
   community.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Fix: bottom-nav panel logic in script.js is index-based
     (0 Home, 1 Tools, 2 Learn, 3 Community, 4 Profile). On community.html
     position 3 is "Community" — intercept in the capture
     phase so script.js's listener never sees this click. ---- */
  const bottomNav = document.getElementById('bottom-nav');
  const communityLink = bottomNav?.querySelector('a[href="community.html"]');
  if (bottomNav && communityLink) {
    bottomNav.addEventListener('click', (e) => {
      if (e.target.closest('a[href="community.html"]')) {
        e.stopImmediatePropagation();
        // Already on this page — just keep the active state correct.
        e.preventDefault();
        bottomNav.querySelectorAll('.bottom-nav__item').forEach(i => i.classList.remove('active'));
        communityLink.classList.add('active');
      }
    }, true);
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.cm-faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cm-faq-item');
      const wasOpen = item.classList.contains('open');
      item.closest('.cm-faq__grid').querySelectorAll('.cm-faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- Stat Counter Animation ---- */
  function animateStat(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const isK = suffix.includes('K');
    const duration = 1200;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = ease * target;
      el.textContent = isK ? (value / 1000).toFixed(1) + suffix : Math.round(value) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statEls = document.querySelectorAll('.cm-stat-card__value[data-count]');
  if (statEls.length) {
    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => statObserver.observe(el));
  }

  /* ---- Groups Carousel Dots (mobile) ---- */
  const groupsScroll = document.querySelector('.cm-groups__scroll');
  const dotsWrap = document.getElementById('groups-dots');

  if (groupsScroll && dotsWrap) {
    const cards = groupsScroll.querySelectorAll('.cm-group-card');
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'cm-groups__dot' + (i === 0 ? ' active' : '');
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('.cm-groups__dot');

    let scrollTimeout;
    groupsScroll.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = groupsScroll.scrollLeft;
        const cardWidth = cards[0]?.offsetWidth || 1;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }, 80);
    }, { passive: true });
  }

});