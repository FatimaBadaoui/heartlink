import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import serverUrl from "../urls.js";
import Loading from "../components/Loading.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // fetch with credentials to allow cookies
        const response = await axios.get(`${serverUrl}/api/posts`, {
          withCredentials: true, // Include credentials for cookie handling
        });
        if (response.status === 200) {
          console.log("Posts fetched successfully:", response.data.data);
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Use default posts on error
      }
    };

    fetchPosts();
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 px-4 mx-auto max-w-3xl">
      {loading ? <Loading /> : <Posts title="Recent Posts" posts={posts} />}
    </div>
  );
};

export default Home;
