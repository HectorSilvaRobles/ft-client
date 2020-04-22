import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: `${process.env.firebaseAPIKey}`,
    authDomain: `${process.env.firebaseAuthDom}`,
    databaseURL: `${process.env.firebaseDBUrl}`,
    projectId: "futbol-training",
    storageBucket: `${process.env.firebaseStorageBucket}`,
    messagingSenderId: "183686796114",
    appId: "1:183686796114:web:28d41faf78aa6be709e08b"
};


// Initialize firebase
firebase.initializeApp(firebaseConfig);

// firebase storage
const storage = firebase.storage()

export {storage, firebase as default}