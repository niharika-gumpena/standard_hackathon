// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnma82qk5tJMkL6hAGvTj_lzCdJCYAo6w",
  authDomain: "scproject-e9725.firebaseapp.com",
  projectId: "scproject-e9725",
  storageBucket: "scproject-e9725.appspot.com",
  messagingSenderId: "801779320530",
  appId: "1:801779320530:web:9f74be4ebaa38146638f0b",
  measurementId: "G-5HDKFJFG2J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };  // ✅ Now exporting both auth and db

