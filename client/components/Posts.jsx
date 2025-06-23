import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";

const Posts = ({ title, posts }) => {
  const [postLiked, setPostLiked] = useState(false);

  return (
    <div className="flex-1 px-4">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      {/* POSTS */}
      <div className="flex flex-col gap-8 mt-4">
        {posts.map((post, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.lastName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <BsPersonCircle className="w-10 h-10 text-gray-500" />
              )}
              <h2 className="text-l font-semibold">
                {post.author?.firstName} {post.author?.lastName}
              </h2>
            </div>
            <p className="my-2">{post.content}</p>
            <div className="w-full max-h-[400px] overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.content}
                className="object-cover w-full"
              />
            </div>

            <div className="flex items-center justify-end gap-10 pt-4">
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
