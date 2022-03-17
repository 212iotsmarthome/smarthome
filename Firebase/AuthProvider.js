import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { useNavigation } from "@react-navigation/native";
import * as RootNavigation from "../RootNavigation";

export const AuthContext = React.createContext();
const userCollectionRef = db.collection("User");

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getUser = async (email) => {
      const data = await userCollectionRef.get();
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const {control, useremail, ID, loggedIn, name, uid} = list.find(x => x.email === email)
      setUser({control, useremail, ID, loggedIn, name})
    };
    
    const unsubscibed = auth.onAuthStateChanged(async (user) => {
        if (user) {
            setIsLoading(false);
            await getUser(user.email);
            RootNavigation.navigate("HomeScreen");
            return;
        }
        setIsLoading(false);
        RootNavigation.navigate("WelcomeScreen");
    });
    return unsubscibed;
  }, [RootNavigation, auth]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <></> : children}
    </AuthContext.Provider>
  );
}