import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpS3I0PSXrknBQ-mJbsCV04z8uVtiGdTE",
  authDomain: "doandanganh-nhom22.firebaseapp.com",
  projectId: "doandanganh-nhom22",
  storageBucket: "doandanganh-nhom22.appspot.com",
  messagingSenderId: "585437457631",
  appId: "1:585437457631:web:7a6ef3ae7affd0df6d0d6a",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const fb = firebase;

export { db, auth, fb };
