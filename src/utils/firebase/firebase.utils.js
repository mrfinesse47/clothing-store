import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCcaCtHrRjh6FFo2CKC9qOBWPR3tnMCLI4',
  authDomain: 'crwn-clothing-db-80139.firebaseapp.com',
  projectId: 'crwn-clothing-db-80139',
  storageBucket: 'crwn-clothing-db-80139.appspot.com',
  messagingSenderId: '1015073203428',
  appId: '1:1015073203428:web:27171526cceaa1a2fd38f1',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userDocRef);
  console.log(userSnapShot.exists());

  //if user data does not exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log('error creating user ', e);
    }
  }
  return userDocRef;
};
