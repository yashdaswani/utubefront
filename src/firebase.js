// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoJaywbm2W5f4BnyZW-htKNc4WgH3vxw8",
  authDomain: "utube-8be3e.firebaseapp.com",
  projectId: "utube-8be3e",
  storageBucket: "utube-8be3e.appspot.com",
  messagingSenderId: "1039230225898",
  appId: "1:1039230225898:web:8ff3b059670b4f6d2ab693",
  measurementId: "G-PMGSZJ5892"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);



export default app;