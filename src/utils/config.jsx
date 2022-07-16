// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD4-0xAVM0ckXOGILozp2zJsp8HbPNNMg",
  authDomain: "p-lotv1-f208b.firebaseapp.com",
  databaseURL: "https://p-lotv1-f208b-default-rtdb.firebaseio.com",
  projectId: "p-lotv1-f208b",
  storageBucket: "p-lotv1-f208b.appspot.com",
  messagingSenderId: "216056603318",
  appId: "1:216056603318:web:eacb4d5e9797aea091bc17",
  measurementId: "G-RM9MKXLQZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);