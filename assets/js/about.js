/* ============================================
   AI GALAXY — ABOUT US PAGE JS
   assets/js/about.js
   ============================================ */

import { db } from './firebase-config.js';
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) return;

      const submitButton = form.querySelector('button[type="submit"]');
      const originalLabel = submitButton?.textContent.trim() || 'Send Message';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.firstChild.textContent = 'Sending... ';
      }

      try {
        await addDoc(collection(db, 'contactMessages'), {
          to: 'abduhamidsuleiman059@gmail.com',
          name,
          email,
          replyTo: email,
          message: {
            subject: `AI Galaxy contact message from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`
          },
          status: 'new',
          createdAt: serverTimestamp()
        });
        if (typeof window.showToast === 'function') {
          window.showToast('Thanks, ' + name + '! Your message has been sent.');
        }
        form.reset();
      } catch (err) {
        console.error('Contact form error:', err);
        if (typeof window.showToast === 'function') {
          window.showToast('Could not send your message. Please try again.');
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.firstChild.textContent = originalLabel + ' ';
        }
      }
    });
  }

});