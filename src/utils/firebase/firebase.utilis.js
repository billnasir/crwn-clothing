import {initializeApp} from 'firebase/app';
import{
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
 }from 'firebase/auth';

import{
  getFirestore,
  doc,
  getDoc,
  setDoc
}from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbBQqvX5psoqc3MsQNhHzQDHAtfbFkPx0",
  authDomain: "crwn-clothing-db-6c76a.firebaseapp.com",
  projectId: "crwn-clothing-db-6c76a",
  storageBucket: "crwn-clothing-db-6c76a.appspot.com",
  messagingSenderId: "513354849280",
  appId: "1:513354849280:web:1ffd2aef09a246bca80ce5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider=new GoogleAuthProvider();
 
googleProvider.setCustomParameters({
  prompt:"select_account"
})

export const auth=getAuth();
export const signInWithGooglePopup= () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect=()=> signInWithRedirect(auth,googleProvider)

export const db=getFirestore();

export const createUserDocumentFromAuth=async(
  userAuth,
  additionalInformation={}
  )=>{
 if(!userAuth) return;
 
  const userDocRef=doc(db, 'users', userAuth.uid)

 
 const userSnapshot=await getDoc(userDocRef);
  

 //if user data exists
 if(!userSnapshot.exists()){
  const {displayName, email}= userAuth;
  const createdAt= new Date();

  try{
    await setDoc(userDocRef,{
      displayName,
      email,
      createdAt,
      ...additionalInformation
    });
  }catch(error){
    console.log('error creating the user', error.message)
  }
 }

 //if user data does not exist

 return userDocRef;

};

export const createAuthUserWithEmailAndPassword= async(email,password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
}


export const signInAuthUserWithEmailAndPassword= async(email,password)=>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password)
}