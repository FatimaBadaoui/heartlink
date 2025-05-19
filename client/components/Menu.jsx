import { Link } from "react-router";
import { BiMessageSquareAdd } from "react-icons/bi";
import { FaHeart, FaUserEdit, FaUserFriends } from "react-icons/fa";

const Menu = () => {
  return (
    <>
      <Link
        to="/create-post"
        className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md ease-in-out duration-300"
      >
        <BiMessageSquareAdd className="text-2xl text-gray-300" />
        <p className="max-[500px]:hidden">Create Post</p>
      </Link>
      <Link
        to="liked-posts"
        className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md ease-in-out duration-300"
      >
        <FaHeart className="text-2xl text-gray-300" />
        <p className="max-[500px]:hidden">Posts Liked</p>
      </Link>
      <Link
        to="friends"
        className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md ease-in-out duration-300"
      >
        <FaUserFriends className="text-2xl text-gray-300" />
        <p className="max-[500px]:hidden">My Friends</p>
      </Link>
      <Link
        to="edit-user"
        className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md ease-in-out duration-300"
      >
        <FaUserEdit className="text-2xl text-gray-300" />
        <p className="max-[500px]:hidden">Edit Profile</p>
      </Link>
    </>
  );
};

export default Menu;
