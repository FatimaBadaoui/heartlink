import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, errors } = useAuth();

  console.log("Signup errors:", errors);

  return (
    <div className="w-full h-screen flex flex-col gap-12 items-center justify-center">
      <h1 className="text-4xl">Sign Up</h1>
      <form className="flex flex-col gap-4 sm:w-80 md:w-96 mt-4">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="border border-gray-300 p-2 rounded"
          autoComplete="username"
          autoFocus
          required
        />
        {errors.length > 0 && (
          <div className="text-center">
            <ul className="text-red-500">
              {errors.map((error, index) => {
                if (error.username) {
                  return <li key={index}>{error.username}</li>;
                }
              })}
            </ul>
          </div>
        )}
        <input
          type="text"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className="border border-gray-300 p-2 rounded"
          autoComplete="given-name"
          required
        />
        {errors.length > 0 && (
          <div className="text-center">
            <ul className="text-red-500">
              {errors.map((error, index) => {
                if (error.firstName) {
                  return <li key={index}>{error.firstName}</li>;
                }
              })}
            </ul>
          </div>
        )}

        <input
          type="text"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          className="border border-gray-300 p-2 rounded"
          autoComplete="family-name"
          required
        />
        {errors.length > 0 && (
          <div className="text-center">
            <ul className="text-red-500">
              {errors.map((error, index) => {
                if (error.lastName) {
                  return <li key={index}>{error.lastName}</li>;
                }
              })}
            </ul>
          </div>
        )}

        <div className="border border-gray-300 p-2 rounded flex items-center justify-between">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full h-full bg-transparent outline-none"
            autoComplete="current-password"
            required
          />
          {showPassword ? (
            <BsEyeSlash
              className="cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <BsEye
              className="cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        {errors.length > 0 && (
          <div className="text-center">
            <ul className="text-red-500">
              {errors.map((error, index) => {
                if (error.password) {
                  return <li key={index}>{error.password}</li>;
                }
              })}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="bg-white text-black rounded py-1 cursor-pointer hover:bg-purple-400 transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            signup(username, firstName, lastName, password);
          }}
        >
          Sign Up
        </button>
      </form>

      <p className="text-gray-500">
        You already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
