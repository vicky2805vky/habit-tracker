import mongoose from "mongoose";
import config from "./dotenv.config";

export const connectDb = async () => {
  if (!config.databaseURL) throw new Error("could not found the database URL");
  await mongoose.connect(config.databaseURL);
  console.log("successfully connected to the database");
};
