import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Create a Cloudinary storage instance
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts", // Specify the folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif"], // Allowed file formats
  },
});

// Export the configured Cloudinary instance and storage
export { cloudinary, storage };