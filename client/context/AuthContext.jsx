import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username,
          password,
        }
      );
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Login successful:", userData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signup = async (username, firstName, lastName, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          username,
          firstName,
          lastName,
          password,
        }
      );
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Signup successful:", userData);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
