// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Client");
  const [name, setName] = useState("");

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole,name, setName, setIsLoggedIn, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
