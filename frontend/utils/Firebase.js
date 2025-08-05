import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-a5a13.firebaseapp.com",
  projectId: "loginonecart-a5a13",
  storageBucket: "loginonecart-a5a13.firebasestorage.app",
  messagingSenderId: "218550993598",
  appId: "1:218550993598:web:76a2f826f171d9706014ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

