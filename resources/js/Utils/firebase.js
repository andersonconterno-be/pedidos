import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLaEq1ClVT0GrMZpBVqMgbcvrPHsgRuPg",
  authDomain: "curso-laravel-dodavid.firebaseapp.com",
  databaseURL: "https://curso-laravel-dodavid-default-rtdb.firebaseio.com",
  projectId: "curso-laravel-dodavid",
  storageBucket: "curso-laravel-dodavid.firebasestorage.app",
  messagingSenderId: "459911075385",
  appId: "1:459911075385:web:a91486c901c72c3eb2dfe8",
  measurementId: "G-09Z8QEL2F6"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
