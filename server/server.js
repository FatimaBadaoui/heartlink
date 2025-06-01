import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import connectDB from "./config/connectDB.js";

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

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
