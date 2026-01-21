import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../FireBase.js";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.useAuth = function useAuth() {
  return useContext(AuthContext);
};

export default AuthProvider;
