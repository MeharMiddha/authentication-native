import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCPFo2_mXZBnOXXHa4yWeUu4YSWFdfzvzg",
  authDomain: "authentication-2e702.firebaseapp.com",
  projectId: "authentication-2e702",
  storageBucket: "authentication-2e702.appspot.com",
  messagingSenderId: "570320915017",
  appId: "1:570320915017:web:89c10eccae06b71a858d98",
  measurementId: "G-MEL8EFB72T"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const analytics = getAnalytics(FIREBASE_APP);