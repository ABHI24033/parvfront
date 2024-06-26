// src/firebase.js
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import {firebase} from "firebase/app"

import { initializeApp } from "firebase/app";


// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAXTIyKir5i1B0G7erjZGgsp77n44pf3sc",
    authDomain: "parvfinance-84dfd.firebaseapp.com",
    projectId: "parvfinance-84dfd",
    storageBucket: "parvfinance-84dfd.appspot.com",
    messagingSenderId: "61238398028",
    appId: "1:61238398028:web:3adc9d4210df2d70bb78e9"
  };

firebase.initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
