import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyClhqxPwlIhE67gA5POVE8UxkY7eN3p1Rc",
  authDomain: "sample-firebase-ai-app-4b195.firebaseapp.com",
  projectId: "sample-firebase-ai-app-4b195",
  storageBucket: "sample-firebase-ai-app-4b195.firebasestorage.app",
  messagingSenderId: "210147624821",
  appId: "1:210147624821:web:64fa4e4ab26db21fb6353c",
  databaseURL: "https://sample-firebase-ai-app-4b195-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

