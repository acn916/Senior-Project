// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Client");
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole,name, userEmail, userPhone, setUserPhone, setUserEmail, setName, setIsLoggedIn, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
