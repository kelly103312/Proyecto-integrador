"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb1ipj78MC3WGMJIsDxo7ubDd9AapmUl4",
  authDomain: "cueva-encanta.firebaseapp.com",
  projectId: "cueva-encanta",
  storageBucket: "cueva-encanta.appspot.com",
  messagingSenderId: "431079774204",
  appId: "1:431079774204:web:8df4248e6a61486d3b0479"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db }; 