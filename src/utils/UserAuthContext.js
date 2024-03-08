import React, { createContext, useState } from "react";

// Create the user auth context
export const UserAuthContext = createContext();

// Create the user auth provider component
export const UserAuthProvider = ({ children }) => {
  // State to hold the user auth data
  const [userAuth, setUserAuth] = useState(() => {
    // Get user data from sessionStorage
    const savedUser = sessionStorage.getItem("user");

    if (savedUser) {
      return JSON.parse(savedUser);
    } else {
      return null;
    }
  });

  // Function to update the user auth data
  const updateUserAuth = (newUserAuth) => {
    setUserAuth(newUserAuth);
    // Also update sessionStorage
    sessionStorage.setItem("user", JSON.stringify(newUserAuth));
  };

  // Value object to be passed to the context provider
  const value = {
    userAuth,
    updateUserAuth,
  };

  // Render the context provider with the provided children
  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};
