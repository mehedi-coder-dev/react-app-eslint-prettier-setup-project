import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB3tKIdb4lvkYG7aI7XEtgu-QXSsE2_j8Q',
  authDomain: 'chat-apps-404c3.firebaseapp.com',
  projectId: 'chat-apps-404c3',
  storageBucket: 'chat-apps-404c3.appspot.com',
  messagingSenderId: '714476138307',
  appId: '1:714476138307:web:063f77f5ba65735ea689f6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
