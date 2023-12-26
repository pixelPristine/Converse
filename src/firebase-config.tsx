// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgOzJif4fV5bLvJdl7wlDW2sY0itLNxiE",
  authDomain: "converse-b4168.firebaseapp.com",
  projectId: "converse-b4168",
  storageBucket: "converse-b4168.appspot.com",
  messagingSenderId: "1069360082542",
  appId: "1:1069360082542:web:188a737e14354acd8f407f",
  measurementId: "G-7LC8WB51PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)