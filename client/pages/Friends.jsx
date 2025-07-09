import { useAuth } from "../context/AuthContext";
import axios from "axios";
import serverUrl from "../urls.js";
import { useEffect, useState } from "react";
import Loading from "../components/Loading.jsx";

const Friends = () => {
  const { user } = useAuth();
  const [friendsList, setFriendsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch friends from the server
  useEffect(() => {
    const fetchFriend = async (friendId) => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${friendId}`, {
          withCredentials: true,
        });
        setFriendsList((prevFriends) => [...prevFriends, response.data.user]);
      } catch (error) {
        console.error("Error fetching friend:", error);
        return null;
      }
    };

    user.friends.forEach((friendId) => {
      fetchFriend(friendId);
    });
    setLoading(false);
  }, [user.friends]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 px-4">
      <h1 className="text-3xl font-bold mb-8">My Friends</h1>
      <div className="flex flex-col gap-8 mt-4">
        {friendsList.map((friend) => (
          <div
            key={friend._id}
            className="p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <img
                src={friend.avatar}
                alt={friend.firstName}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <h2 className="text-l font-semibold">
                {friend.firstName} {friend.lastName}
              </h2>
            </div>
            <button className="bg-[#f834b6] px-6 py-2 rounded-lg cursor-pointer hover:bg-[#9c529c] transition duration-300 ease-in-out">
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
