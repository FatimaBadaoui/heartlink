import { MdDelete } from "react-icons/md";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import serverUrl from "../urls.js";
import { Link } from "react-router";

const Posts = ({ title, posts }) => {
  const { user, updateLocalUser } = useAuth();

  const handleLikePost = async (postId) => {
    // Check if the user has already liked the post
    try {
      if (user.postsLiked.includes(postId)) {
        // if already liked, remove the like
        await axios.put(
          `${serverUrl}/api/posts/dislike/${postId}`,
          {},
          {
            withCredentials: true,
          }
        );
        // Update the local state to reflect the change
        const updatedUser = {
          ...user,
          postsLiked: user.postsLiked.filter((id) => id !== postId),
        };
        updateLocalUser(updatedUser);
      } else {
        // if not liked, add the like
        await axios.put(
          `${serverUrl}/api/posts/like/${postId}`,
          {},
          {
            withCredentials: true,
          }
        );
        // Update the local state to reflect the change
        const updatedUser = {
          ...user,
          postsLiked: [...user.postsLiked, postId],
        };
        updateLocalUser(updatedUser);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    // have the user consent to delete the post
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${serverUrl}/api/posts/${postId}`, {
        withCredentials: true,
      });
      // Optionally, you can update the posts state to remove the deleted post
      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.filter((post) => post._id !== postId),
      }));
      // refresh page
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="flex-1 px-4 py-8 mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <p className="text-gray-500">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-8 mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      {/* POSTS */}
      <div className="flex flex-col gap-8 mt-4">
        {posts.map((post, index) => (
          <div
            key={post._id || index}
            className="p-4 rounded-lg shadow-md max-w-[600px] bg-[#c6bcc217]"
          >
            {/* DELETE POST */}
            {user._id === post.author?._id && (
              <div className="flex items-center justify-end">
                <button onClick={() => handleDeletePost(post._id)}>
                  <MdDelete className="text-2xl text-red-500 cursor-pointer hover:scale-125 transition duration-300 ease-in-out" />
                </button>
              </div>
            )}
            <Link
              to={`/profile/${post.author?._id}`}
              className="flex items-center gap-2"
            >
              <img
                src={
                  post.author?.avatar
                    ? post.author.avatar
                    : "/default-avatar.png"
                }
                alt={post.author?.lastName}
                className="w-10 h-10 rounded-full object-cover"
              />

              <h2 className="text-l font-semibold">
                {post.author?.firstName} {post.author?.lastName}
              </h2>
            </Link>
            <p className="my-2">{post.content}</p>
            <div className="w-full overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.content}
                className="object-cover w-full"
              />
            </div>

            <div className="flex items-center justify-end gap-10 pt-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleLikePost(post._id)}
              >
                {user.postsLiked.includes(post._id) ? (
                  <FaHeart className="text-2xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-2xl text-red-500" />
                )}
                <p className="">{post.likes}</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <FaRegCommentDots className="text-2xl" />
                <p className="">10</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
