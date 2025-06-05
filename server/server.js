import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import postsRoutes from "./routes/posts.route.js";
import connectDB from "./config/connectDB.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import isAuth from "./middleware/isAuth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// CONNECT TO DATABASE
await connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/users", isAuth, userRoutes);
app.use("/api/posts", isAuth, postsRoutes);

// ERROR HANDLING MIDDLEWARE
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
