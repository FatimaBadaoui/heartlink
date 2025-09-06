import { Fragment, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout, user, query, setQuery } = useAuth();
  const navigate = useNavigate();

  console.log("user in navbar", user);

  return (
    <div className="w-full flex items-center justify-between px-8 py-2 sticky top-0 shadow-md z- bg-[#070707] h-[70px]">
      {/* LOGO */}
      <Link to="/" className="hidden sm:block">
        <img src="/logo.png" alt="Logo" className="w-50 h-16" />
      </Link>
      <Link to="/" className="sm:hidden">
        <img src="/logo-sm.png" alt="Logo" className="w-10 h-8" />
      </Link>
      {/* SEARCH */}
      <div className="w-[60%] mx-auto sm:w-[320px] flex items-center justify-between gap-2 bg-[#fefefe50] rounded-lg px-2 py-1">
        <input
          type="search"
          className="w-full border-none out-none focus:outline-none bg-transparent placeholder:text-gray-300"
          placeholder="Search Post..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <BiSearch className="text-2xl text-gray-300  cursor-pointer hover:scale-[0.8] ease-in-out duration-300" />
      </div>
      {/* USER */}

      <button
        className="flex items-center gap-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="User"
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-[0.8] ease-in-out duration-300"
        />
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute top-[70px] right-2 bg-[#070707] shadow-lg rounded-lg p-4 w-48">
          <ul className="space-y-2">
            <li>
              <Link
                to="/my-posts"
                className="block px-4 py-2 hover:bg-white/10 duration-300 ease-in-out rounded"
                onClick={() => setIsOpen(false)}
              >
                My Posts
              </Link>
            </li>
            <li>
              <Link
                to="/edit-profile"
                className="block px-4 py-2 hover:bg-white/10 duration-300 ease-in-out rounded"
                onClick={() => setIsOpen(false)}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  // Handle logout logic here
                  console.log("Logout clicked");
                  setIsOpen(false);
                  logout();
                  navigate("/login");
                }}
                className="block px-4 py-1.5 mt-2 bg-red-400 w-full hover:bg-red-600 duration-300 ease-in-out cursor-pointer rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
