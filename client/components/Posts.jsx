import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";

const Posts = ({title, posts}) => {
  const [postLiked, setPostLiked] = useState(false);

  return (
    <div className="flex-1 px-4">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      {/* POSTS */}
      <div className="flex flex-col gap-8 mt-4">
        {posts.map((post, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
              {post.authorImage ? (
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <BsPersonCircle className="w-10 h-10 text-gray-500" />
              )}
              <h2 className="text-l font-semibold">{post.author}</h2>
            </div>
            <p className="my-2">{post.description}</p>
            <div className="w-full max-h-[400px] overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.description}
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-10 pt-4">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setPostLiked((prev) => !prev)}
              >
                {postLiked ? (
                  <FaHeart className="text-2xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-2xl text-red-500" />
                )}
                <p className="">{post.likes}</p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <FaRegCommentDots className="text-2xl" />
                <p className="">{post.comments?.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
