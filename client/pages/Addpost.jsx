import { LuImagePlus } from "react-icons/lu";

const AddPost = () => {
  return (
    <div className="flex flex-col gap-4 h-screen w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Content"
          className="p-2 border border-gray-300 rounded h-42"
        ></textarea>
        {/* ADD PICTURE */}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer transition duration-200 flex items-center gap-2 p-2 rounded text-gray-300 hover:bg-[#ffffff3c]"
        >
          <LuImagePlus className="text-3xl " />
          Add Image
        </label>

        <button
          type="submit"
          className="bg-[#9704b4] text-white p-2 rounded hover:bg-[#804d8b] transition duration-300 cursor-pointer"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
