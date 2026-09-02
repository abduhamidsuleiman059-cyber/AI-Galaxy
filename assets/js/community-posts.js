import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

/* ============================================
   AI GALAXY — COMMUNITY POSTS (Firestore)
   community-posts.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const listEl   = document.getElementById('cm-recent-posts-list');
  const newBtn   = document.getElementById('cm-new-post-btn');
  if (!listEl) return; // hii JS ni ya community.html tu

  let currentUser = null;
  onAuthStateChanged(auth, (user) => { currentUser = user; });

  /* ---- Muda tangu post iliundwa ("3h ago") ---- */
  function timeAgo(date) {
    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secs < 60) return 'just now';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  const personIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;

  function postItemHTML(post) {
    const when = post.createdAt ? timeAgo(post.createdAt.toDate()) : 'just now';
    return `
      <div class="cm-post-item">
        <div class="cm-post-item__avatar">${personIcon}</div>
        <div>
          <div class="cm-post-item__title">${escapeHTML(post.title)}</div>
          <div class="cm-post-item__meta">@${escapeHTML(post.authorName)} · ${when} · 💬 0</div>
        </div>
      </div>`;
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  /* ---- Load posts kutoka Firestore ---- */
  async function loadPosts() {
    listEl.innerHTML = `<p style="color:var(--text-muted);padding:1rem 0;">Loading posts…</p>`;
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
      const snap = await getDocs(q);

      if (snap.empty) {
        listEl.innerHTML = `<p style="color:var(--text-muted);padding:1rem 0;">No posts yet — be the first to start a discussion!</p>`;
        return;
      }

      listEl.innerHTML = snap.docs.map(d => postItemHTML(d.data())).join('');
    } catch (err) {
      console.error('Load posts error:', err);
      listEl.innerHTML = `<p style="color:var(--text-muted);padding:1rem 0;">Could not load posts. Please try again.</p>`;
    }
  }

  /* ---- Modal ya "New Post" (mtindo ule ule wa auth modal) ---- */
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'cm-post-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true">
      <button class="modal-close" id="cm-post-close" aria-label="Close">✕</button>
      <h2 class="modal-heading">Start a Discussion</h2>
      <p class="modal-subheading">Share something with the AI Galaxy community</p>
      <div class="modal-field">
        <label>Title</label>
        <input type="text" id="cm-post-title" placeholder="What's on your mind?" maxlength="120" />
      </div>
      <div class="modal-field">
        <label>Details (optional)</label>
        <textarea id="cm-post-body" rows="4" placeholder="Add more context…" style="width:100%;padding:0.75rem 1rem;background:rgba(255,255,255,0.05);border:1px solid rgba(124,58,237,0.25);border-radius:12px;color:#fff;font-size:0.9rem;box-sizing:border-box;resize:vertical;font-family:inherit;"></textarea>
      </div>
      <button class="btn btn--primary modal-submit" id="cm-post-submit">Post Discussion</button>
      <p class="modal-error" id="cm-post-error" hidden></p>
    </div>`;
  document.body.appendChild(overlay);

  const postCloseBtn  = overlay.querySelector('#cm-post-close');
  const postTitleIn   = overlay.querySelector('#cm-post-title');
  const postBodyIn    = overlay.querySelector('#cm-post-body');
  const postSubmitBtn = overlay.querySelector('#cm-post-submit');
  const postErrorEl   = overlay.querySelector('#cm-post-error');

  function openPostModal() {
    postTitleIn.value = '';
    postBodyIn.value = '';
    postErrorEl.hidden = true;
    overlay.hidden = false;
    postTitleIn.focus();
  }
  function closePostModal() { overlay.hidden = true; }

  postCloseBtn.addEventListener('click', closePostModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePostModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) closePostModal(); });

  newBtn?.addEventListener('click', () => {
    if (!currentUser) {
      document.getElementById('signin-btn')?.click();
      return;
    }
    openPostModal();
  });

  postSubmitBtn.addEventListener('click', async () => {
    const title = postTitleIn.value.trim();
    const body  = postBodyIn.value.trim();
    postErrorEl.hidden = true;

    if (!title) {
      postErrorEl.textContent = 'Please enter a title.';
      postErrorEl.style.color = '#ef4444';
      postErrorEl.hidden = false;
      return;
    }
    if (!currentUser) { closePostModal(); document.getElementById('signin-btn')?.click(); return; }

    postSubmitBtn.textContent = 'Posting…';
    postSubmitBtn.disabled = true;
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        body,
        authorUid: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email.split('@')[0],
        createdAt: serverTimestamp()
      });
      closePostModal();
      loadPosts();
    } catch (err) {
      console.error('New post error:', err);
      postErrorEl.textContent = 'Could not post. Please try again.';
      postErrorEl.style.color = '#ef4444';
      postErrorEl.hidden = false;
    } finally {
      postSubmitBtn.textContent = 'Post Discussion';
      postSubmitBtn.disabled = false;
    }
  });

  loadPosts();
});