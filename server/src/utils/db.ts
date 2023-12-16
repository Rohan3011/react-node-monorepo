import mongoose from "mongoose";
import log from "./logger";
import "dotenv/config";

export const connectToDB = async () => {
  const mongoURI = process.env.MONGO_URI!;
  try {
    const connect = await mongoose.connect(mongoURI);
    log.info(`Connected to Database successfully`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};
