// // authContext.js

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token and user information from localStorage
    const authToken = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    // Check if both token and user information are present
    if (authToken && user) {
      // Perform any additional authentication checks if needed
      setAuth(true);
      // Redirect to the dashboard or home page
      navigate("/");
    }
  }, []);
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

// custom hook
const useAuth = () => {
  const auth = useContext(authContext);
  return auth;
};

export { useAuth, AuthContextProvider };
