// src/firebase.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCSbGSkQl8YmCHyk7vbIO0XrRWlfMOXyzM",
  authDomain: "react-fiber-auth.firebaseapp.com",
  projectId: "react-fiber-auth",
  storageBucket: "react-fiber-auth.appspot.com",
  messagingSenderId: "207133843791",
  appId: "1:207133843791:web:YOUR_APP_SPECIFIC_ID"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
