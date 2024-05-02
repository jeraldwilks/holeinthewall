import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./FirebaseProvider";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (ex) {
      console.log("AUTH FAILURE!", ex.message);
      return "Invalid login";
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const adminStatus = await fetch(
          "https://checkadmin-x7v2pbe4eq-nn.a.run.app?email=" + user.email
        );
        const data = await adminStatus.json();
        setIsAdmin(data);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const value = {
    user,
    isAdmin,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
