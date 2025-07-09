import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import serverUrl from "../urls.js";
import Posts from "../components/Posts.jsx";

const UserProfile = () => {
  // get user id from URL params
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${userId}`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/posts/user/${userId}`,
          {
            withCredentials: true,
          }
        );
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUser();
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  console.log("user data:", user);

  return (
    <div className="flex-1 px-4 mx-auto max-w-3xl">
      <div className="flex flex-col items-center gap-4 p-4 border-b-2 border-gray-200">
        <div className="w-[250px]">
          <img
            src={user?.avatar || "/default-avatar.png"}
            alt={user?.firstName}
            className="object-cover rounded-full"
          />
        </div>
        <h1 className="text-2xl font-semibold">
          {user?.firstName} {user?.lastName}
        </h1>
        <button className="bg-[#f834b6] px-6 py-2 rounded-lg cursor-pointer hover:bg-[#ff00ff] transition duration-300 ease-in-out">
          Follow
        </button>
      </div>
      <Posts title={`${user?.firstName}'s Posts`} posts={posts} />
    </div>
  );
};

export default UserProfile;
