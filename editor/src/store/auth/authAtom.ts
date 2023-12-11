import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APP_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_APP_FIREBASE_PROJECT_ID}`,
  appId: `${import.meta.env.VITE_APP_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID}`,
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let auth: Auth | null = null;
const getFirebaseAuth = () => {
  if (auth) return auth;
  auth = getAuth(app);
  return auth;
};
