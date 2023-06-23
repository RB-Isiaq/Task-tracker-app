import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists!"],
      required: [true, "Username is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// The models object is provided by the Mongoose library and store all the registered models.
const User = mongoose.model("User", UserSchema);

export default User;
