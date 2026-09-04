import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  collection, addDoc, doc, deleteDoc, query, orderBy, limit, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

/* ============================================
   AI GALAXY — COMMUNITY POSTS (Firestore)
   community-posts.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const listEl = document.getElementById('cm-recent-posts-list');
  const newBtn = document.getElementById('cm-new-post-btn');
  if (!listEl) return; // hii JS ni ya community.html tu

  let currentUser = null;
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    loadPosts();
  });

  /* ---- Styles: New Post button ndogo + accordion + delete ---- */
  const style = document.createElement('style');
  style.textContent = `
    #cm-new-post-btn {
      padding: 0.45rem 1rem; font-size: 0.82rem; border-radius: 999px;
      box-shadow: none; display: inline-flex; align-items: center; gap: 0.35rem;
    }
    #cm-new-post-btn:hover { filter: brightness(1.08); }

    .cm-post-item {
      display: block; cursor: pointer; padding: 0.65rem 0.5rem; border-radius: 10px;
      transition: background 0.15s; position: relative;
    }
    .cm-post-item:hover { background: rgba(124,58,237,0.06); }
    .cm-post-item:hover .cm-post-item__delete { opacity: 1; }

    .cm-post-item__body {
      max-height: 0; overflow: hidden; opacity: 0;
      transition: max-height 0.3s ease, opacity 0.2s ease, margin-top 0.25s ease;
      font-size: 0.85rem; color: rgba(255,255,255,0.62);
      margin-top: 0; margin-left: calc(36px + var(--space-3));
      line-height: 1.65; white-space: pre-wrap; word-break: break-word;
    }
    .cm-post-item.is-open .cm-post-item__body {
      max-height: 1000px; opacity: 1; margin-top: 0.6rem;
    }

    .cm-post-item__chevron {
      margin-left: auto; flex-shrink: 0; color: rgba(255,255,255,0.3);
      transition: transform 0.2s ease;
    }
    .cm-post-item.is-open .cm-post-item__chevron { transform: rotate(180deg); }

    .cm-post-item__row { display: flex; align-items: center; gap: var(--space-3); }

    .cm-post-item__delete {
      flex-shrink: 0; width: 30px; height: 30px; border-radius: 9px;
      background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.18);
      color: rgba(248,113,113,0.8); display: flex; align-items: center; justify-content: center;
      cursor: pointer; opacity: 0; transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
    }
    .cm-post-item__delete svg { width: 14px; height: 14px; }
    .cm-post-item__delete:hover,
    .cm-post-item__delete:focus-visible {
      background: rgba(239,68,68,0.18); border-color: rgba(248,113,113,0.5); color: #fca5a5;
      opacity: 1;
    }
    .cm-post-item__delete:focus-visible { outline: 2px solid rgba(248,113,113,0.75); outline-offset: 2px; }
    @media (max-width: 768px) {
      .cm-post-item__delete { opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);

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
  const chevronIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>`;
  const trashIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function postItemHTML(id, post) {
    const when = post.createdAt ? timeAgo(post.createdAt.toDate()) : 'just now';
    const isOwner = currentUser && post.authorUid === currentUser.uid;
    const bodyHTML = post.body
      ? escapeHTML(post.body).replace(/\n/g, '<br>')
      : '<em style="opacity:.6;">No additional details.</em>';

    return `
      <div class="cm-post-item" data-id="${id}">
        <div class="cm-post-item__row">
          <div class="cm-post-item__avatar">${personIcon}</div>
          <div>
            <div class="cm-post-item__title">${escapeHTML(post.title)}</div>
            <div class="cm-post-item__meta">@${escapeHTML(post.authorName)} · ${when} · 💬 0</div>
          </div>
          ${isOwner ? `<button class="cm-post-item__delete" data-delete-id="${id}" type="button" title="Delete post" aria-label="Delete post">${trashIcon}</button>` : ''}
          <span class="cm-post-item__chevron">${chevronIcon}</span>
        </div>
        <div class="cm-post-item__body">${bodyHTML}</div>
      </div>`;
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

      listEl.innerHTML = snap.docs.map(d => postItemHTML(d.id, d.data())).join('');
    } catch (err) {
      console.error('Load posts error:', err);
      listEl.innerHTML = `<p style="color:var(--text-muted);padding:1rem 0;">Could not load posts. Please try again.</p>`;
    }
  }

  /* ---- Accordion open/close + delete (delegated) ---- */
  listEl.addEventListener('click', async (e) => {
    const delBtn = e.target.closest('.cm-post-item__delete');
    if (delBtn) {
      e.stopPropagation();
      const id = delBtn.dataset.deleteId;
      if (!confirm('Delete this post? This cannot be undone.')) return;
      try {
        await deleteDoc(doc(db, 'posts', id));
        loadPosts();
      } catch (err) {
        console.error('Delete post error:', err);
        alert('Could not delete post. Please try again.');
      }
      return;
    }

    const item = e.target.closest('.cm-post-item');
    if (!item) return;
    const wasOpen = item.classList.contains('is-open');
    listEl.querySelectorAll('.cm-post-item.is-open').forEach(el => el.classList.remove('is-open'));
    if (!wasOpen) item.classList.add('is-open');
  });

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