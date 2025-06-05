import multer from "multer";
import { storage } from "../config/cloudinary.js";

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

export default upload;