import mongoose from "mongoose";

console.log("env ", process.env);

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
