/* ============================================
   AI GALAXY — ABOUT US PAGE JS
   assets/js/about.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Info cards accordion (mobile) ---- */
  document.querySelectorAll('.ab-info-card__head').forEach(head => {
    head.addEventListener('click', () => {
      const card = head.closest('.ab-info-card');
      card.classList.toggle('ab-open');
    });
  });

  /* ---- Contact form ---- */
  const form = document.getElementById('ab-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) return;

      if (typeof window.showToast === 'function') {
        window.showToast('Thanks, ' + name + '! Your message has been received.');
      } else {
        alert('Thanks, ' + name + '! Your message has been received.');
      }
      form.reset();
    });
  }

});