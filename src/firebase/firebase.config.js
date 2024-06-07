"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Ma3fOSb_D-k21TU0uotWhEbsNgXM6Xs",
  authDomain: "game-a4e35.firebaseapp.com",
  projectId: "game-a4e35",
  storageBucket: "game-a4e35.appspot.com",
  messagingSenderId: "501566743396",
  appId: "1:501566743396:web:49a8a351be6a2c69445071"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db }; 