import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore"; // Import the getFirestore function

const firebaseConfig = {
    apiKey: "AIzaSyD4yi0uMfw-YOAXTFbcNxY4KHltiqbmTZU",
    authDomain: "social-media-22609.firebaseapp.com",
    projectId: "social-media-22609",
    storageBucket: "social-media-22609.appspot.com",
    messagingSenderId: "495445923202",
    appId: "1:495445923202:web:f09066ee829241b6d9ab9b"
};

const app = initializeApp(firebaseConfig);
const authInstance = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app); // Get the Firestore instance

export { app, auth, authInstance, firestore }; // Export the firestore instance