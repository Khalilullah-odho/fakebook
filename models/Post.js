import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema({
  body: String,
  postPhoto: String,
  username: String,
  userId: String,
  createdAt: String,
  comment: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Post = model("Post", postSchema);

export default Post;
