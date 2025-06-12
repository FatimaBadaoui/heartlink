import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

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
        <input
          type="text"
          placeholder="first name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          className="border border-gray-300 p-2 rounded"
          autoComplete="given-name"
          required
        />

        <input
          type="text"
          placeholder="last name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          className="border border-gray-300 p-2 rounded"
          autoComplete="family-name"
          required
        />

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
        <button
          type="submit"
          className="bg-white text-black rounded py-1 cursor-pointer hover:bg-purple-400 transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            signup(username, firstName, lastName, password);
            navigate("/");
          }}
        >
          Login
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
