import { db, auth } from "../firebase";
import { useState, useEffect } from 'react';

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

export { handleSignUp, handleSignIn, handleSignOut, useLogIn, auth };