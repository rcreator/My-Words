import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyC7noxaV-B7ecfLS1OO-ckE6yiay9TrErg",
  authDomain: "mywords-4ec73.firebaseapp.com",
  projectId: "mywords-4ec73",
  storageBucket: "mywords-4ec73.appspot.com",
  messagingSenderId: "103558320219",
  appId: "1:103558320219:web:89c7e214fc4c4c0e0bef7e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const store = getStorage(app);

export { auth , provider, store};
export default db;