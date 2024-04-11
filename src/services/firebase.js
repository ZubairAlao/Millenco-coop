import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {getFirestore, doc, getDoc, collection, setDoc, addDoc, updateDoc, arrayUnion, deleteDoc} from "firebase/firestore"

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

export const deleteUserFromFirestore = async (userId) => {
  try {

    const usersCollectionRef = collection(db, 'users');
    const userDocRef = doc(usersCollectionRef, userId);
    await deleteDoc(userDocRef);
    console.log('User deleted');
  } catch (error) {
    console.error('Error deleting user from Firestore:', error);
  }
};

export const getProfileData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const profileData = docSnap.data()
      return profileData
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

// export const uploadImageToFirebase = async (file) => {
//   try {
//     const imageRef = ref(storage, `images/${file.name}`);
//     const uploadImg = uploadBytes(imageRef, file);
//     const snapshot = await uploadImg;
//     const downloadURL = await getDownloadURL(snapshot.ref);
//     return downloadURL;
//   } catch (error) {
//     console.error('Error uploading image to Firebase:', error);
//     throw error;
//   }
// };

export const uploadImageToFirebase = async (userId, file) => {
  try {
    // Check if the user already has an image stored
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    let oldPhotoUrl = null;
    if (docSnap.exists()) {
      const userData = docSnap.data();
      oldPhotoUrl = userData.photoUrl;
      if (oldPhotoUrl) {
        // Delete the existing image from Firestore Storage
        await deleteImageFromFirebase(oldPhotoUrl);
      }
    }

    // Upload the new image to Firestore Storage
    const imageRef = ref(storage, `images/${file.name}`);
    const uploadImg = uploadBytes(imageRef, file);
    const snapshot = await uploadImg;

    // Get the download URL of the uploaded file
    const newPhotoUrl = await getDownloadURL(snapshot.ref);

    // Update the Firestore document with the new image URL
    await setDoc(docRef, { photoUrl: newPhotoUrl }, { merge: true });

    return newPhotoUrl;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};

export const deleteImageFromFirebase = async (photoUrl) => {
  try {
    // Parse the photo URL to extract the file path
    const filePath = new URL(photoUrl);

    // Create a reference to the file in Firebase Storage
    const fileRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting image from Firebase:", error);
    throw error;
  }
};

export const addPaymentToFirestore = async (userId, payment) => {
  try {
    // Reference to the 'payments' collection
    const docRef =  doc(db, 'users', userId)

    await updateDoc(docRef, {
      paymentHistory: arrayUnion(payment)
    });

    console.log('Payment added to Firestore');
  } catch (error) {
    console.error('Error adding payment to Firestore: ', error);
    throw error;
  }
};

export const addLoanToFirestore = async (userId, payment) => {
  try {
    // Reference to the 'payments' collection
    const docRef =  doc(db, 'users', userId)

    await updateDoc(docRef, {
      loanHistory: arrayUnion(payment)
    });

    console.log('loan added to Firestore');
  } catch (error) {
    console.error('Error adding loan to Firestore: ', error);
    throw error;
  }
};

export const addLoanRepayToFirestore = async (userId, payment) => {
  try {
    // Reference to the 'payments' collection
    const docRef =  doc(db, 'users', userId)

    await updateDoc(docRef, {
      loanRepayHistory: arrayUnion(payment)
    });

    console.log('loan payment added to Firestore');
  } catch (error) {
    console.error('Error adding loan to Firestore: ', error);
    throw error;
  }
};

export const addContactUsToFirestore = async (contactId, messageData) => {
  try {
    const contactCollectionRef = collection(db, 'contact_us');
    
    await setDoc(doc(contactCollectionRef, contactId), messageData);

    console.log('message added');
  } catch (error) {
    console.error('Error adding message to Firestore:', error);
  }
};

export const getContactData = async (contactId) => {
  try {
    const docRef = doc(db, "contact_us", contactId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const contactData = docSnap.data()
      return contactData
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error('Error geting contact from Firestore: ', error);
    throw error;
  }
}