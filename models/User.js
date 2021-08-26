import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  dob: String,
  gender: String,
  createdAt: String,
  followers: [{ username: String, followedAt: String }],
});

const User = model("User", userSchema);

export default User;
