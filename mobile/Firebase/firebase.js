// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhP48Ray3_P_eGeUFnWSDIpdSSvADFX4Y",
  authDomain: "appreallife-ea3d9.firebaseapp.com",
  projectId: "appreallife-ea3d9",
  storageBucket: "appreallife-ea3d9.appspot.com",
  messagingSenderId: "660139114594",
  appId: "1:660139114594:web:e965add83a9aae7f41d13b",
  measurementId: "G-E4GD29CE31"
};

// Initialize Firebase
	export const app = initializeApp(firebaseConfig);
	export const auth = getAuth(app)