// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; // Importa Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGReYfnlmAAOR2-MwDXXQrPvJd-OWbUGA",
  authDomain: "pwa-gps-465f0.firebaseapp.com",
  projectId: "pwa-gps-465f0",
  storageBucket: "pwa-gps-465f0.appspot.com",
  messagingSenderId: "87850210615",
  appId: "1:87850210615:web:64e5a01b4e2efd0f11b6b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider(); // Inicializa el proveedor de Google

export const firestore = getFirestore(app); // Inicializa Firestore

export { auth, googleProvider }; // Asegúrate de exportar el proveedor

