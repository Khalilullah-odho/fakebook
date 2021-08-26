import Post from "../../models/Post.js";
import auth from "../../middleware/auth.js";
import { UserInputError } from "apollo-server";

export default {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getUserPosts: async (_, { username }, context) => {
      const user = auth(context);
      try {
        const posts = await Post.find({ username }).sort({ createdAt: -1 });
        return posts;
      } catch (error) {}
    },
  },

  Mutation: {
    createPost: async (_, { body, postPhoto }, context) => {
      const user = auth(context);

      if (body.trim() === "") {
        throw new UserInputError("Post cannot be empty");
      }

      try {
        const newPost = new Post({
          body,
          postPhoto,
          user: user.indexOf,
          userId: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        const post = await newPost.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    deletePost: async (_, { postId }, context) => {
      const user = auth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post Deleted Successfully";
        } else {
          throw new Error("Method not allowed");
        }
      } catch (error) {
        throw new Error(error, "New Error thrown");
      }
    },

    editPost: async (_, { postId, body, postPhoto }, context) => {
      const { username } = auth(context);
      try {
        const post = await Post.findByIdAndUpdate(
          postId,
          {
            body,
            postPhoto,
          },
          { new: true }
        );
        if (post) {
          if (post.username !== username) throw new Error("Method not allowed");
          return post;
        } else {
          throw new Error("post not found");
        }
      } catch (error) {
        throw new Error("something went wrong", error);
      }
    },

    likePost: async (_, { postId }, context) => {
      const { username } = auth(context);

      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === username)) {
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            post.likes.push({
              username,
              createdAt: new Date().toISOString(),
            });
          }
          await post.save();
          return post;
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
