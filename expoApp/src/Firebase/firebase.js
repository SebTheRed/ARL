import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBhP48Ray3_P_eGeUFnWSDIpdSSvADFX4Y",
  authDomain: "appreallife-ea3d9.firebaseapp.com",
  projectId: "appreallife-ea3d9",
  storageBucket: "appreallife-ea3d9.appspot.com",
  messagingSenderId: "660139114594",
  appId: "1:660139114594:web:e965add83a9aae7f41d13b",
  measurementId: "G-E4GD29CE31"
};
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app)