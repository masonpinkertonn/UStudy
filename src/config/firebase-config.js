// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmKwvwI1-n0DDxkvJbQMqHMrYtP1nn4oc",
  authDomain: "bytesizeapp-f40ad.firebaseapp.com",
  projectId: "bytesizeapp-f40ad",
  storageBucket: "bytesizeapp-f40ad.firebasestorage.app",
  messagingSenderId: "1014667569260",
  appId: "1:1014667569260:web:3a85350ff5701fee5ed049",
  measurementId: "G-0PZHLW5P28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);