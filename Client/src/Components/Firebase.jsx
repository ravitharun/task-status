// src/firebase.js

// Import individual functions from their respective modules
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Import getAuth and GoogleAuthProvider directly

const firebaseConfig = {
  apiKey: "AIzaSyCSbGSkQl8YmCHyk7vbIO0XrRWlfMOXyzM",
  authDomain: "react-fiber-auth.firebaseapp.com",
  projectId: "react-fiber-auth",
  storageBucket: "react-fiber-auth.appspot.com",
  messagingSenderId: "207133843791",
  appId: "1:207133843791:web:YOUR_APP_SPECIFIC_ID" // Ensure this is correct
};

// Initialize Firebase app
// Use getApps() to check if an app is already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // If already initialized, get the default app
}

// Get service instances
export const auth = getAuth(app); // Pass the initialized app to getAuth
export const googleProvider = new GoogleAuthProvider(); // GoogleAuthProvider is now directly imported and doesn't need 'auth' prefix