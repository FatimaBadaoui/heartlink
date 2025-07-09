import { useEffect, useState } from "react";
import Posts from "../components/Posts";
import { useAuth } from "../context/AuthContext.jsx";
import serverUrl from "../urls.js";
import axios from "axios";

const PostsLiked = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  console.log("user in PostsLiked:", user);

  // fetch liked posts from the server
  useEffect(() => {
    const fetchLikedPost = async (postId) => {
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

    if (user && user.postsLiked && user.postsLiked.length > 0) {
      user.postsLiked.forEach((postId) => {
        fetchLikedPost(postId);
      });
    }
  }, [user]);

  return <Posts title="Posts Liked" posts={posts} />;
};

export default PostsLiked;
