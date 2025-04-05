// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvHqRyAp6_lkvy7MFnxXsOFboS2cMIMTI",
  authDomain: "bibliophiles-7bf1d.firebaseapp.com",
  projectId: "bibliophiles-7bf1d",
  storageBucket: "bibliophiles-7bf1d.firebasestorage.app",
  messagingSenderId: "765628400016",
  appId: "1:765628400016:web:484684dcf0941906653315",
  measurementId: "G-0QNRF1KLZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);