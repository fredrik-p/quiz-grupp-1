import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCEYWnhSzvYlXKBgilTSQB4O_cx_Tvt2jE",
    authDomain: "front-end-ddc50.firebaseapp.com",
    databaseURL: "https://front-end-ddc50.firebaseio.com",
    projectId: "front-end-ddc50",
    storageBucket: "front-end-ddc50.appspot.com",
    messagingSenderId: "166260714765",
    appId: "1:166260714765:web:c5431919472f7da5ca9444"

}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const db = firebase.firestore();
const google = new firebase.auth.GoogleAuthProvider();
export { auth, db, google }