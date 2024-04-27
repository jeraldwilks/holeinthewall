// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2iV15i-Wf77RkPZIKFx8PA5BDYrN0eXI",
  authDomain: "hole-in-the-wall-food.firebaseapp.com",
  projectId: "hole-in-the-wall-food",
  storageBucket: "hole-in-the-wall-food.appspot.com",
  messagingSenderId: "710250999060",
  appId: "1:710250999060:web:dee2bad697523e66362601",
  measurementId: "G-QYE76F0KZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
