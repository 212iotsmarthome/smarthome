import { db, auth } from "./firebase";
import { useState, useEffect } from 'react';

const userCollectionRef = db.collection("Users");

const handleSignUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential =>{
        const user = userCredential.user;
        console.log("Registered with: " + user.email);
      })
      .catch(error => alert(error.message))
}

const handleSignIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential =>{
        const user = userCredential.user;
        console.log("Log In with: " + user.email);
      })
      .catch(error => alert(error.message))
}

const handleSignOut = (action) => {
  auth
    .signOut()
    .then(() => action())
    .catch(error => alert(error.message))
}

function useLogIn(action) {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
              action();
            }
        })
        return unsubscribe;
    }, [])
}

// function getUser(email) {
//   useEffect(() => {
//     const getUser = async () => {
//       const data = await userCollectionRef.get();
//       const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       console.log(list);
//       setUser(list.find(x => x.email === email))
//     };

//     getUser();
//   }, []);
// }


export { handleSignUp, handleSignIn, handleSignOut, useLogIn, auth };