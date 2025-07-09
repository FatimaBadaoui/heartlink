import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import serverUrl from "../urls.js";
import Posts from "../components/Posts.jsx";

const MyPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  // Fetch user's posts from the server
  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await axios.get(`${serverUrl}/api/posts/${postId}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setPosts((prevPosts) => [...prevPosts, response.data.data]);
        } else {
          console.error("Failed to fetch post:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (user && user.posts && user.posts.length > 0) {
      user.posts.forEach((postId) => {
        fetchPost(postId);
      });
    }
  }, [user]);

  return <Posts title={"My Posts"} posts={posts} />;
};

export default MyPosts;
