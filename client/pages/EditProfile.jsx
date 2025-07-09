import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import serverUrl from "../urls.js";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarShown, setAvatarShown] = useState(
    user.avatar || "/default-avatar.png"
  );
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const updatedData = {};

      // Only include fields that have values
      if (firstName) updatedData.firstName = firstName;
      if (lastName) updatedData.lastName = lastName;
      if (password) updatedData.password = password;

      // Convert avatar to base64 only if a new image is provided
      if (avatar instanceof File) {
        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

        const base64Image = await toBase64(avatar);
        updatedData.avatar = base64Image;
      }

      // Make update request
      const res = await axios.put(`${serverUrl}/api/users`, updatedData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update user in context
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
      }));

      navigate("/");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error?.response?.data || error.message
      );
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`${serverUrl}/api/users`, {
          withCredentials: true, // ⬅️ Required for sending cookies
        });
        setUser(null); // Clear user from context
        localStorage.removeItem("user"); // Clear user from local storage
        navigate("/signup"); // Redirect to signup page
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div className="w-full mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-15">Edit Profile</h1>
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex flex-col gap-2 w-[30%] p-4 items-center">
          <img
            src={avatarShown}
            alt="user avatar"
            className="object-cover rounded-full h-52 w-52 mb-4"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-input"
            onChange={(e) => {
              setAvatarShown(URL.createObjectURL(e.target.files[0]));
              setAvatar(e.target.files[0]);
            }}
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer hover:underline hover:underline-offset-2 transition duration-300"
          >
            Edit Image
          </label>
        </div>
        <div className="flex flex-col gap-4 w-[60%] p-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="p-2 border border-gray-300 rounded"
          />
          <div className="border border-gray-300 p-2 rounded flex items-center justify-between">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-full bg-transparent outline-none"
              autoComplete="current-password"
              required
            />
            {showPassword ? (
              <BsEyeSlash
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BsEye
                className="cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div className="border border-gray-300 p-2 rounded flex items-center justify-between">
            <input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repeat Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
              className="w-full h-full bg-transparent outline-none"
              autoComplete="current-password"
              required
            />
            {showRepeatPassword ? (
              <BsEyeSlash
                className="cursor-pointer"
                onClick={() => setShowRepeatPassword(false)}
              />
            ) : (
              <BsEye
                className="cursor-pointer"
                onClick={() => setShowRepeatPassword(true)}
              />
            )}
          </div>
          <button
            className="bg-white text-black rounded py-1 cursor-pointer hover:bg-purple-400 transition-colors duration-300"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
          {/* DELETE USER */}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded py-1 cursor-pointer hover:bg-red-600 transition-colors duration-300"
          >
            DELETE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
