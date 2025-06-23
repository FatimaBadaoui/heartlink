import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import axios from "axios";
import serverUrl from "../urls.js";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
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
  }, []);

  return <Posts title="Feed" posts={posts} />;
};

export default Home;
