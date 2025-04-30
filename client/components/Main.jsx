import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";

const Main = () => {
  const [postLiked, setPostLiked] = useState(false);

  const posts = [
    {
      author: "mountain_lilly",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Breathtaking morning hike in the mountains 🌄",
      likes: 152,
      comments: [
        {
          user: "trail_runner",
          commentContent: "Love the mist in the background!",
        },
        { user: "hiker_gal", commentContent: "Where was this taken?" },
      ],
    },
    {
      author: "pasta_queen",
      image:
        "https://images.unsplash.com/photo-1585672840563-f2af2ced55c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Just made this creamy mushroom pasta 😋",
      likes: 98,
      comments: [
        { user: "foodlover21", commentContent: "That looks SO good!" },
        { user: "chef_mario", commentContent: "Needs more cheese 😁" },
      ],
    },
    {
      author: "cityscape_chris",
      image:
        "https://images.unsplash.com/photo-1580895456895-cfdf02e4c23f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Late-night stroll through the city lights ✨",
      likes: 187,
      comments: [
        {
          user: "urban_dreamer",
          commentContent: "This has real Blade Runner vibes!",
        },
      ],
    },
    {
      author: "wave_wanderer",
      image:
        "https://images.unsplash.com/photo-1501950084492-95ac4e239234?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Chasing waves and sunsets 🌊🌅",
      likes: 213,
      comments: [
        { user: "beach_bum", commentContent: "This is my happy place." },
        { user: "sunset_chaser", commentContent: "What a view!" },
      ],
    },
    {
      author: "puppy_pal",
      image:
        "https://images.unsplash.com/photo-1630250348519-173c58a3dad4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHVwcHklMjBpbiUyMHBhcmt8ZW58MHx8MHx8fDA%3D",
      description: "A day in the park with my pup 🐶",
      likes: 134,
      comments: [
        { user: "doggo_mom", commentContent: "So fluffy!!" },
        { user: "bark_master", commentContent: "What's their name?" },
      ],
    },
  ];

  return (
    <div className="flex-1 px-4">
      <h1 className="text-3xl font-bold mb-8">Feed</h1>
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

export default Main;
