// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Your web app's Firebase configuration
const backupFirebaseConfig = {
  // KEY값 입력
  // apiKey: '',
  // authDomain: '',
  // projectId: '',
  // storageBucket: '',
  // messagingSenderId: '',
  // appId: '',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const backupApp = initializeApp(backupFirebaseConfig, 'secondary');
export const auth = getAuth(app);
export const db = getFirestore(app);
export const backupDB = getFirestore(backupApp);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
