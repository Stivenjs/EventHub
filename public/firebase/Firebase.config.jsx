// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClqBbz3ammlxVZGAq9bSCndyPWPu0Id7c",
  authDomain: "eventhub-e9304.firebaseapp.com",
  projectId: "eventhub-e9304",
  storageBucket: "eventhub-e9304.appspot.com",
  messagingSenderId: "186593214469",
  appId: "1:186593214469:web:9d4807b6cfdcbfa3a61c6c",
  measurementId: "G-P3H8675XFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);