import React, { useState, useEffect } from "react";
import { auth, db, fb } from "./firebase";
import * as RootNavigation from "../RootNavigation";

export const AuthContext = React.createContext();
const userCollectionRef = db.collection("User");

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async (target_email) => {
      const data = await userCollectionRef.get();
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const { email, name, createAt, ID, control, address } = list.find(
        (x) => x.email === target_email
      );
      setUser({ email, name, createAt, ID, control, address });
      return { email, name, createAt, ID, control, address };
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

  const changePassword = (oldPassword, newPassword) => {
    var thisUser = auth.currentUser;
    var cred = fb.auth.EmailAuthProvider.credential(
      thisUser.email,
      oldPassword
    );
    thisUser.reauthenticateWithCredential(cred).then(() => {
      thisUser
        .updatePassword(newPassword)
        .then(() => {
          // setMsg("Password hehe!");
          console.log("Password changed!");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return msg;
  };

  return (
    <AuthContext.Provider value={{ user, changePassword }}>
      {isLoading ? <></> : children}
    </AuthContext.Provider>
  );
}
