// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBr5pyUozIjR6Efx_DhFISfmypbjsRvV9U',
    authDomain: 'e-commerce-reactnative-febe6.firebaseapp.com',
    projectId: 'e-commerce-reactnative-febe6',
    storageBucket: 'e-commerce-reactnative-febe6.appspot.com',
    messagingSenderId: '225379060531',
    appId: '1:225379060531:web:d94abcb93735d2ea854c46',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
