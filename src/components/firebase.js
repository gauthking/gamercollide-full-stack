import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
require('dotenv').config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "gamercollide-f72ca.firebaseapp.com",
    projectId: "gamercollide-f72ca",
    storageBucket: "gamercollide-f72ca.appspot.com",
    messagingSenderId: "415219911982",
    appId: "1:415219911982:web:6745a79a8176f4c2b8bebf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const authentication = getAuth(app);

export { authentication, db }