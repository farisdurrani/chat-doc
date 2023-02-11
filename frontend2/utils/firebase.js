// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX5cuZZB_Nkd1zNNYsrAJSC531zd15G5k",
  authDomain: "chat-doc-70279.firebaseapp.com",
  projectId: "chat-doc-70279",
  storageBucket: "chat-doc-70279.appspot.com",
  messagingSenderId: "477892335998",
  appId: "1:477892335998:web:62489fd718fe554d13fb2f",
};

console.log("Firebase initialized");

// Initialize Firebase
if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
