import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBe12v3ULPNlAxapSZ1zu5eFoxxHzpY-rU",
    authDomain: "college-bus-tracking-903e7.firebaseapp.com",
    projectId: "college-bus-tracking-903e7",
    storageBucket: "college-bus-tracking-903e7.firebasestorage.app",
    messagingSenderId: "898454276553",
    appId: "1:898454276553:web:74723599a656c4ab4d4018",
    measurementId: "G-0JR0BBNJDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics = null;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);

// Export app instance
export default app;
