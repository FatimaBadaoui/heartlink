import { BiSearch } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-8 pt-2 sticky top-0 shadow-md z-10">
      {/* LOGO */}
      <Link to="/" className="hidden sm:flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-50 h-18" />
      </Link>
      {/* SEARCH */}
      <div className="w-[80%] mx-auto sm:w-[320px] flex items-center justify-between gap-2 bg-[#fefefe50] rounded-lg px-2 py-1">
        <input
          type="search"
          className="border-none out-none focus:outline-none bg-transparent placeholder:text-gray-300"
          placeholder="Search..."
        />
        <BiSearch className="text-2xl text-gray-300  cursor-pointer hover:scale-[0.8] ease-in-out duration-300" />
      </div>
      {/* USER */}

      <Link to="/" className="hidden md:flex items-center gap-2 ">
        {/* <img
            src="/user.png"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          /> */}
        <BsPersonCircle className="text-4xl text-gray-300 cursor-pointer hover:scale-[0.8] ease-in-out duration-300" />
      </Link>
    </div>
  );
};

export default Navbar;
