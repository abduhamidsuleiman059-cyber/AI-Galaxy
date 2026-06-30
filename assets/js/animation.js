/* ============================================
   AI GALAXY — ANIMATION TRIGGERS
   animation.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* Add reveal classes to section elements */
  document.querySelectorAll('.tools-section .section-top').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.categories-section .section-top').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.features-section .features-strip').forEach(el => el.classList.add('reveal-stagger'));
  document.querySelectorAll('.tools-grid').forEach(el => el.classList.add('reveal-stagger'));

});