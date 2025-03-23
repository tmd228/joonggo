// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseAPI from "./firebaseAPI";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = firebaseAPI

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export default app
export { auth, db, storage }