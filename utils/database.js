import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    // console.log("MongoDB is already connected")
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "task_tracker_app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
