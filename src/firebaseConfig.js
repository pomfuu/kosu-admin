import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDF3187eOCbR99ZJFvRi4w92GFiFA0Gcbs",
    authDomain: "teskosudulu.firebaseapp.com",
    projectId: "teskosudulu",
    storageBucket: "teskosudulu.appspot.com",
    messagingSenderId: "328107246588",
    appId: "1:328107246588:web:4fadb134d7d752de60e879",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
