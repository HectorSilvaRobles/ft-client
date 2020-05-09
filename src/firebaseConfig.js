import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOM}`,
    databaseURL: `${process.env.REACT_APP_FIREBASE_DB_URL}`,
    projectId: "futbol-training",
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: "183686796114",
    appId: "1:183686796114:web:28d41faf78aa6be709e08b"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// firebase storage
const storage = firebase.storage()

export {storage, firebase as default}