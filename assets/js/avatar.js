/* ============================================
   AI GALAXY — AVATAR RENDERER
   avatar.js
   Shared kati ya bottom-nav (mobile) na
   mob-panel header — huonyesha picha ya
   mtumiaji (photoURL), au herufi ya kwanza
   ya jina lake ikiwa hana picha.
   ============================================ */

function getInitial(user) {
  const source = (user && (user.displayName || user.email)) || 'U';
  return source.trim().charAt(0).toUpperCase();
}

function avatarHTML(user, sizeClass) {
  if (user && user.photoURL) {
    return `<img src="${user.photoURL}" alt="" class="${sizeClass}" />`;
  }
  const initial = getInitial(user);
  return `<div class="${sizeClass} avatar-letter">${initial}</div>`;
}

const NAV_FALLBACK_SVG = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const MOB_FALLBACK_SVG = `<svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

/**
 * applyAvatars(user)
 * Piga hii kila auth state inapobadilika (login/logout)
 * au mara tu baada ya picha mpya kupakiwa (upload).
 * user = Firebase User object, au null kama amelogout.
 */
export function applyAvatars(user) {
  /* ---- Bottom-nav Profile icon ---- */
  const navLink = document.querySelector('.bottom-nav__item[data-panel="profile"]');
  if (navLink) {
    const iconEl = navLink.querySelector('svg, img.nav-avatar, div.nav-avatar');
    if (iconEl) {
      iconEl.outerHTML = user ? avatarHTML(user, 'nav-avatar') : NAV_FALLBACK_SVG;
    }
  }

  /* ---- Mobile profile panel header avatar ---- */
  const mobAvatar = document.querySelector('.mob-panel__avatar');
  if (mobAvatar) {
    mobAvatar.innerHTML = user ? avatarHTML(user, 'mob-avatar-img') : MOB_FALLBACK_SVG;
  }
}