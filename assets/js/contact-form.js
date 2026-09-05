/* ============================================
   AI GALAXY — CONTACT FORM (EmailJS)
   contact-form.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ab-contact-form');
  if (!form) return;

  emailjs.init({ publicKey: 'DMIbHYRCkKiJs-pni' });

  const submitBtn = form.querySelector('.ab-form-submit');
  const originalLabel = submitBtn.innerHTML;

  let statusEl = document.getElementById('ab-form-status');
  if (!statusEl) {
    statusEl = document.createElement('p');
    statusEl.id = 'ab-form-status';
    statusEl.style.cssText = 'font-size:0.85rem;text-align:center;margin-top:0.75rem;';
    statusEl.hidden = true;
    form.appendChild(statusEl);
  }

  function showStatus(msg, ok) {
    statusEl.textContent = msg;
    statusEl.style.color = ok ? '#4ade80' : '#ef4444';
    statusEl.hidden = false;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.hidden = true;

    if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse().length === 0) {
      showStatus('Please verify you are not a robot.', false);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    emailjs.sendForm('service_t758de7', 'template_4n5bgje', form)
      .then(() => {
        showStatus('Message sent! We\'ll get back to you soon.', true);
        form.reset();
        if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
      })
      .catch((err) => {
        console.error('Contact form error:', err);
        showStatus('Could not send message. Please try again.', false);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      });
  });
});