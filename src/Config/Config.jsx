import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBcm6T4CwJPnYbg72dQEJZlQXzGKOoSby0",
    authDomain: "gaproject-3.firebaseapp.com",
    projectId: "gaproject-3",
    storageBucket: "gaproject-3.appspot.com",
    messagingSenderId: "499933259901",
    appId: "1:499933259901:web:30476766522bfd77452914",
    measurementId: "G-SYVH5CSR8R"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service
const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
const storage = getStorage(app); // Initialize Cloud Storage and get a reference to the service

export { auth, db, storage }