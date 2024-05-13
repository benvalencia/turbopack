// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// App's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCXgL0nEooQelAIkavVEVHsv_6yMKfGcRI",
    authDomain: "turbobase-26e74.firebaseapp.com",
    projectId: "turbobase-26e74",
    storageBucket: "turbobase-26e74.appspot.com",
    messagingSenderId: "160401772820",
    appId: "1:160401772820:web:1b366bef528294885d7201"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Connection to Data base
const db = getFirestore(app)

export { app, db };

