import mongoose from "mongoose";
import { config } from "./config";
const connectDb = async () => {
  try {
   await mongoose.connection.on("connected", () => {
      console.log("database connected successfully");
    });
  await  mongoose.connection.on("error", (err) => {
      console.error("Failed to connect to database", err);
    });
    await mongoose.connect(config.databaseURL as string);
  } catch (error) {
    console.error("Failed to connect to database");
    process.exit(1);
  }
};

export default connectDb;