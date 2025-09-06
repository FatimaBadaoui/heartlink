import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import serverUrl from "../urls.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    // Fetch current user on mount
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/users/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchCurrentUser(); // ⬅️ Fetch fresh data from server
    }
  }, []);

  const login = async (username, password) => {
    if (!username || !password) {
      setErrors(["Username and password are required."]);
      return;
    }
    try {
      const response = await axios.post(
        `${serverUrl}/api/users/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // Required for cookie-based authentication
          headers: {
            "Content-Type": "application/json",
          },
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
      const response = await axios.post(`${serverUrl}/api/users/signup`, {
        username,
        firstName,
        lastName,
        password,
      });
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
    localStorage.removeItem("user");
    setUser(null);
    console.log("User logged out");
  };

  const updateLocalUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        errors,
        updateLocalUser,
        query,
        setQuery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
