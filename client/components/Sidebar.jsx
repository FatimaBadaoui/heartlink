import { BiMessageSquareAdd } from "react-icons/bi";
import { FaHeart, FaUserFriends, FaUserEdit } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="hidden md:flex w-[250px] flex-col gap-4">
      {/* USER */}
      <div className="flex flex-col items-center gap-2 p-4 pb-8 w-full h-fit border-b-2 border-gray-200">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user photo"
          className="w-20 h-20 object-cover rounded-full"
        />
        <p className="font-semibold">Lilly Smith</p>

        <div className="flex items-center justify-between w-full pt-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Followers</p>
            <p className="font-semibold">1.2k</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Following</p>
            <p className="font-semibold">10.2k</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Posts</p>
            <p className="font-semibold">100</p>
          </div>
        </div>
      </div>
      {/* MENU */}
      <div className="flex flex-col gap-2 p-4 w-full h-fit border-b-2 border-gray-200">
        <div className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md">
          <BiMessageSquareAdd className="text-2xl text-gray-300" />
          <p className="">Create Post</p>
        </div>
        <div className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md">
          <FaHeart className="text-2xl text-gray-300" />
          <p className="">Posts Liked</p>
        </div>
        <div className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md">
          <FaUserFriends className="text-2xl text-gray-300" />
          <p className="">My Friends</p>
        </div>
        <div className="flex items-center gap-4 w-full px-4 py-2 cursor-pointer hover:bg-[#ffffff3c] rounded-md mb-4">
          <FaUserEdit className="text-2xl text-gray-300" />
          <p className="">Edit Profile</p>
        </div>
      </div>
      {/* SUGGESTIONS */}
      <div className="flex flex-col gap-2 p-4 w-full">
        <p className="font-semibold mb-4 text-lg">Suggested Friends</p>
        <div className="flex items-center gap-2 w-full cursor-pointer hover:bg-[#ffffff3c] rounded-md p-2">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user photo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <p>Lilly Smith</p>
        </div>
        <div className="flex items-center gap-2 w-full cursor-pointer hover:bg-[#ffffff3c] rounded-md p-2">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user photo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <p>Lilly Smith</p>
        </div>
        <div className="flex items-center gap-2 w-full cursor-pointer hover:bg-[#ffffff3c] rounded-md p-2">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user photo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <p>Lilly Smith</p>
        </div>
        <div className="flex items-center gap-2 w-full cursor-pointer hover:bg-[#ffffff3c] rounded-md p-2">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user photo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <p>Lilly Smith</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
