import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhund7wmCwT3hQOVxTGDxvV_rzTC4dmyk",
    authDomain: "todoapp-29a24.firebaseapp.com",
    projectId: "todoapp-29a24",
    storageBucket: "todoapp-29a24.appspot.com",
    messagingSenderId: "1001038549746",
    appId: "1:1001038549746:web:915ce6caa27ca9d03d366b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
