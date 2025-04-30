import Layout from "../components/Layout.jsx";
import "./App.css";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
{/*         <Route path="/addpost" element={<Addpost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserProfile />} /> */}
      </Routes>
    </>
  );
}

export default App;
