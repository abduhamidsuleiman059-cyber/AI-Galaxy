import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1ItCjZEm-dW6FpP8eQyi3Fe1VsH1Yioo",
  authDomain: "ai-galaxy-b19f6.firebaseapp.com",
  projectId: "ai-galaxy-b19f6",
  storageBucket: "ai-galaxy-b19f6.firebasestorage.app",
  messagingSenderId: "516546792682",
  appId: "1:516546792682:web:4a788bf5f49672e608db93"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);