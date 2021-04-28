import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA5xQs4wwY11h32GNmsRL5NglWIjMe7r0A",
    authDomain: "onl-service-desk.firebaseapp.com",
    projectId: "onl-service-desk",
    storageBucket: "onl-service-desk.appspot.com",
    messagingSenderId: "649016646411",
    appId: "1:649016646411:web:91520db34a31d84036600e",
    measurementId: "G-29DB0BYMTX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default { firebase, firebaseConfig };