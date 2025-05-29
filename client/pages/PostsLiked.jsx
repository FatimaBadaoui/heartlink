import Posts from "../components/Posts";

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

const PostsLiked = () => {
  return (
    <Posts title="Posts Liked" posts={posts} />
  )
}

export default PostsLiked