import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
export { logEvent } from 'firebase/analytics';

// import.metaを使うとjestのテスト実行時にエラーになるため、定数で置き換える
declare let VITE_APP_FIREBASE_API_KEY: string;
declare let VITE_APP_FIREBASE_AUTH_DOMAIN: string;
declare let VITE_APP_FIREBASE_PROJECT_ID: string;
declare let VITE_APP_FIREBASE_APP_ID: string;
declare let VITE_APP_FIREBASE_MEASUREMENT_ID: string;
const firebaseConfig = {
  apiKey: `${VITE_APP_FIREBASE_API_KEY}`,
  authDomain: `${VITE_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${VITE_APP_FIREBASE_PROJECT_ID}`,
  appId: `${VITE_APP_FIREBASE_APP_ID}`,
  measurementId: `${VITE_APP_FIREBASE_MEASUREMENT_ID}`,
};
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
let auth: Auth | null = null;
const getFirebaseAuth = () => {
  if (auth) return auth;
  auth = getAuth(app);
  return auth;
};
export const firebaseAuthInit = async () => {
  const auth = getFirebaseAuth();
  const response = await signInAnonymously(auth);

  return response;
};
