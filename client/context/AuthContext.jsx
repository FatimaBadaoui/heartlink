import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const login = async (username, password) => {
    if (!username || !password) {
      setErrors(["Username and password are required."]);
      return;
    }
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
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || [error.response.data.message]);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
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
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || [error.response.data.message]);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, errors }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
