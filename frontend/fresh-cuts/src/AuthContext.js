// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("Client");
  const [name, setName] = useState("John Smith");
  const [userEmail, setUserEmail] = useState("jsmith@gmail.com");
  const [userPhone, setUserPhone] = useState("1234567");

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, name, userEmail, userPhone, setUserPhone, setUserEmail, setName, setIsLoggedIn, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
