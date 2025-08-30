import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfL91rrbIkypiei1uL4WV-dz5qdGJtAPQ",
  authDomain: "mandip-portfolio.firebaseapp.com",
  projectId: "mandip-portfolio",
  storageBucket: "mandip-portfolio.firebasestorage.app",
  messagingSenderId: "747097914486",
  appId: "1:747097914486:web:4cdc2cb63acd072c647357",
  measurementId: "G-ZQLTF5DE8P"
};

const isFirebaseConfigured = Object.values(firebaseConfig).every(value => value !== '');

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { storage, db, auth, signInWithPopup, googleProvider, isFirebaseConfigured };

export default app;
