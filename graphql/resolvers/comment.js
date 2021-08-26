import { AuthenticationError, UserInputError } from "apollo-server";
import auth from "../../middleware/auth.js";
import Post from "../../models/Post.js";
import { validateBody } from "../../utils/validate.js";

export default {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = auth(context);
      const { error } = validateBody({ body });
      if (error) {
        const message = error.details[0].message;
        throw new UserInputError("Empty comment", message);
      }

      try {
        const post = await Post.findById(postId);

        if (post) {
          post.comment.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else {
          throw new UserInputError("Post does not exists");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = auth(context);

      try {
        const post = await Post.findById(postId);

        if (post) {
          const index = post.comment.findIndex((c) => c.id === commentId);

          if (post.comment[index].username === username) {
            post.comment.splice(index, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("Post not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
