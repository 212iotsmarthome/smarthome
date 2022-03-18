import { db, auth } from "./firebase";
import { serverTimestamp } from 'firebase/firestore';
import { addDocument } from "./service";

const handleSignUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential =>{
        const user = userCredential.user;
        console.log("Registered with: " + user.email);
        addDocument("User", {
          email: user.email,
          name: "Sample Text",
          ID: user.uid,
          control: [],
          createdAt: serverTimestamp(),
        })
      })
      .catch(error => alert(error.message))
}

const handleSignIn = (email, password) => {
    try{
      auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential =>{
        const user = userCredential.user;
        console.log("Log In with: " + user.email);
      })
      .catch(error => alert(error.message))
    }
    catch(e){
      console.log(e);
    }
    
}

const handleSignOut = (action) => {
  auth
    .signOut()
    .then(() => action())
    .catch(error => alert(error.message))
}

export { handleSignUp, handleSignIn, handleSignOut, auth };