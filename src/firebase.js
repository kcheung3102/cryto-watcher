// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from "./config/firebaseConfig"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export { auth, db, provider };

