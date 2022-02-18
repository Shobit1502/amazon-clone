// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyA1RfEFSzxsE4NdQBnvDxGmGFLJA3H3Mm4",
  authDomain: "clone-dc7c0.firebaseapp.com",
  projectId: "clone-dc7c0",
  storageBucket: "clone-dc7c0.appspot.com",
  messagingSenderId: "703065514717",
  appId: "1:703065514717:web:89abfa0576e6878a3ff134",
  measurementId: "G-4FJEFLJ2ZL"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
