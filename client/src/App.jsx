import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import AddPost from "../pages/Addpost.jsx";
import PostsLiked from "../pages/PostsLiked.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/liked-posts" element={<PostsLiked />} />
        </Route>
        {/*         <Route path="/addpost" element={<Addpost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserProfile />} /> */}
      </Routes>
    </>
  );
}

export default App;
