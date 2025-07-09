import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import serverUrl from "../urls.js";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../components/Loading.jsx";

const AddPost = () => {
  const { user, setUser } = useAuth();
  const [post, setPost] = useState({
    content: "",
    image: null,
    author: user?._id || "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.image) {
      alert("Please select an image.");
      return;
    }

    try {
      setLoading(true);
      // Convert image to base64
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const base64Image = await toBase64(post.image);

      const res = await axios.post(
        `${serverUrl}/api/posts`,
        {
          content: post.content,
          image: base64Image,
        },
        {
          withCredentials: true, // 👈 Required when using cookies!
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update user posts with the new post ID
      const newPost = res.data.data;
      setUser((prevUser) => ({
        ...prevUser,
        posts: [...prevUser.posts, newPost._id],
      }));
      setPost({ content: "", image: null, author: user?._id || "" });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while creating the post."
      );
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 h-screen w-full mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <form className="flex flex-col gap-4 mt-10">
        <textarea
          placeholder="Content"
          className="p-2 border border-gray-300 rounded h-42"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        ></textarea>
        {/* ADD PICTURE */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="file-input"
          onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
          required
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer transition duration-200 flex items-center gap-2 p-2 rounded text-gray-300 hover:bg-[#ffffff3c]"
        >
          <LuImagePlus className="text-3xl " />
          {post.image ? post.image.name : "Add Image"}
        </label>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!post.content || !post.image}
          className="bg-[#9704b4] text-white p-2 rounded hover:bg-[#804d8b] transition duration-300 cursor-pointer"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
