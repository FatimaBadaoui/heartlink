import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, errors } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col gap-12 items-center justify-center">
      <h1 className="text-4xl">Login</h1>
      <form className="flex flex-col gap-4 sm:w-80 md:w-96 mt-4">
        {errors.length > 0 && (
          <div className="mt-4 text-center">
            <ul className="text-red-500">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
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
            login(username, password);
            navigate("/");
          }}
        >
          Login
        </button>
      </form>

      <p className="text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
