import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDF3187eOCbR99ZJFvRi4w92GFiFA0Gcbs",
    authDomain: "teskosudulu.firebaseapp.com",
    projectId: "teskosudulu",
    storageBucket: "teskosudulu.firebasestorage.app",
    messagingSenderId: "328107246588",
    appId: "1:328107246588:web:4fadb134d7d752de60e879"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getFirestore(app);