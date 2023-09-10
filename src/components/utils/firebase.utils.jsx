// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getAuth
    
} from 'firebase/auth'
import {
    doc,
    getDoc,
    setDoc,
    getFirestore,
    collection,
    addDoc
} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf9SW7moWbMsgIrbUb2yxTNqShmZZVqto",
  authDomain: "dropout-analysis-db.firebaseapp.com",
  projectId: "dropout-analysis-db",
  storageBucket: "dropout-analysis-db.appspot.com",
  messagingSenderId: "825779382640",
  appId: "1:825779382640:web:7f87371fc345a9fd6987b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);


export const createUserDocumentFromAuth = async (userAuth , additionalInfo) => {
    if(!userAuth) return;
    const userDocRef = doc(db , 'users' , userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    const unlocked = false;
    if(!userSnapshot.exists()){
      const { idproof , email } = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          email,
          createdAt,
          unlocked,
          ...additionalInfo
        })
  
      }
      catch(error){
        console.log(`An error occured in authentication ${error.message}`)
      }
    }
  
    return userDocRef;
  }


export const createAuthUserWithEmailAndPassword = async (email , password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth , email , password)
}

export const signInAuthUserWithEmailAndPassword = async (email , password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth , email , password)
}
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth , callback)

export const signOutUser = async() => await signOut(auth)

export const enterDataIntoDatabase = async(fields) => {
    try{
      await addDoc(collection(db , "data") , {...fields})
    }
    catch(err){
      console.log('an Error occurred')
    }
}

export default db;