import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home";
import AddPost from "../pages/Addpost.jsx";
import PostsLiked from "../pages/PostsLiked.jsx";
import Friends from "../pages/Friends.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import UserProfile from "../pages/UserProfile.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/create-post" element={<AddPost />} />
          <Route path="/liked-posts" element={<PostsLiked />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
