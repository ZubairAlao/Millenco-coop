import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {getFirestore, doc, getDoc, collection, setDoc, updateDoc} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAbVzUXRgMYXSJHrLjbMA-S9H49OMPlXLc",
    authDomain: "millenco-4da23.firebaseapp.com",
    projectId: "millenco-4da23",
    storageBucket: "millenco-4da23.appspot.com",
    messagingSenderId: "297909208867",
    appId: "1:297909208867:web:cba51a7dbfab4bbe7b2e96",
    measurementId: "G-HJGG778LYY"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export const addUserToFirestore = async (userId, profileData) => {
  try {
    // Reference to the 'users' collection in Firestore
    const usersCollectionRef = collection(db, 'users');
    
    // Create a user document with the provided userId
    await setDoc(doc(usersCollectionRef, userId), profileData);

    console.log('User added');
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

export const getProfileData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const profileData = docSnap.data()
      return profileData
      // console.log("Current data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error('Error updating user profile in Firestore: ', error);
    throw error;
  }
}

export const updateProfileData = async (userId, updateNewData) => {
  try {
    const docRef =  doc(db, 'users', userId)

    await setDoc (docRef, updateNewData, { merge: true })
    console.error('updated data: ', updateNewData);
  } catch (error) {
    console.error('Error updating user profile in Firestore: ', error);
    throw error;
  }
}

export const uploadImageToFirebase = async (file) => {
  try {
    const imageRef = ref(storage, `images/${file.name}`);
    const uploadImg = uploadBytes(imageRef, file);
    const snapshot = await uploadImg; // Wait for the upload task to complete
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw error;
  }
};