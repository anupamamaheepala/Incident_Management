// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user_id"));

//   const login = (userId) => {
//     localStorage.setItem("user_id", userId);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("user_id");
//     setIsLoggedIn(false);
//   };

//   const validateUser = async () => {
//     const userId = localStorage.getItem("user_id");
//     if (!userId) {
//       logout(); // No user_id found, treat as logged out
//       return;
//     }

//     try {
//       // Replace with your backend endpoint for validating the user
//       const response = await axios.get(`http://localhost:5000/auth/validate/${userId}`);
//       if (response.data.valid) {
//         setIsLoggedIn(true);
//       } else {
//         logout(); // Invalid user_id, clear it
//       }
//     } catch (error) {
//       console.error("Error validating user:", error);
//       logout(); // Log out on error
//     }
//   };

//   useEffect(() => {
//     validateUser(); // Run validation on app load
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userId) => {
    localStorage.setItem("user_id", userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
  };

  const validateUser = () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsLoggedIn(true); // User is logged in if `user_id` exists
    } else {
      setIsLoggedIn(false); // User is logged out
    }
  };

  useEffect(() => {
    validateUser(); // Validate session when the app loads
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
