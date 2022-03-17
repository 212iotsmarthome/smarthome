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
    const getUser = async (target_email) => {
      const data = await userCollectionRef.get();
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const {email, name, createAt, ID, control} = list.find(x => x.email === target_email)
      setUser({email, name, createAt, ID, control})
      return {email, name, createAt, ID, control}
    };
    
    const unsubscibed = auth.onAuthStateChanged(async (user) => {
        if (user) {
            setIsLoading(false);
            const temp = await getUser(user.email);
            RootNavigation.navigate("HomeScreen");
            return;
        }
        setIsLoading(false);
        RootNavigation.navigate("WelcomeScreen");
    });
    return unsubscibed;
  }, [RootNavigation, auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <></> : children}
    </AuthContext.Provider>
  );
}