import { Link } from "react-router";
import Menu from "./Menu.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import serverUrl from "../urls.js";
import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);

  // fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAllUsers(response.data.users);
          console.log("All users fetched:", response.data.users);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  // Filter out the current user from the suggestions or the user's friends
  const filteredUsers = allUsers.filter(
    (u) =>
      u._id !== user?._id &&
      !user?.friends.filter((friend) => friend._id !== u._id)
  );

  return (
    <div className="hidden md:flex w-[250px] flex-col gap-4">
      {/* USER */}
      <div className="flex flex-col items-center gap-2 p-4 pb-8 w-full h-fit border-b-2 border-gray-200">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="user photo"
          className="w-20 h-20 object-cover rounded-full"
        />
        <p className="font-semibold">
          {user?.firstName} {user?.lastName}
        </p>

        <div className="flex items-center justify-evenly w-full pt-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Friends</p>
            <p className="font-semibold">{user?.friends.length}</p>
          </div>
          {/* <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Following</p>
            <p className="font-semibold">10.2k</p>
          </div> */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400">Posts</p>
            <p className="font-semibold">{user?.posts.length}</p>
          </div>
        </div>
      </div>
      {/* MENU */}
      <div className="flex flex-col gap-2 p-4 w-full h-fit border-b-2 border-gray-200">
        <Menu />
      </div>
      {/* SUGGESTIONS */}
      <div className="flex flex-col gap-2 p-4 w-full">
        <p className="font-semibold mb-4 text-lg">Suggested Friends</p>
        {filteredUsers.map((user) => (
          <Link
            to={`/profile/${user._id}`}
            key={user._id}
            className="flex items-center gap-2 w-full cursor-pointer hover:bg-[#ffffff3c] rounded-md p-2"
          >
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="user photo"
              className="w-10 h-10 object-cover rounded-full"
            />
            <p>
              {user.firstName} {user.lastName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
