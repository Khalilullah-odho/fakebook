import { AuthenticationError, UserInputError } from "apollo-server";
import auth from "../../middleware/auth.js";
import User from "../../models/User.js";

export default {
  Query: {
    getFollowers: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        const { followers } = user;
        return followers;
      } catch (error) {
        throw new Error("something went wrong", error);
      }
    },
  },

  Mutation: {
    followUser: async (_, { username }, context) => {
      const { username: onlineUser } = auth(context);
      let followMsg = "";
      try {
        const user = await User.findOne({ username });
        if (onlineUser === user.username) {
          throw new UserInputError("Method not allowed");
        }
        if (user) {
          if (user.followers.find((f) => f.username === onlineUser)) {
            user.followers = user.followers.filter(
              (f) => f.username !== onlineUser
            );
            followMsg = "have unfollowed";
          } else {
            user.followers.push({
              username: onlineUser,
              followedAt: new Date().toISOString(),
            });
            followMsg = "are following";
          }
          await user.save();
          return `You ${followMsg} ${user.username}`;
        }
      } catch (error) {
        throw new Error("something went wrong", error);
      }
    },
  },
};
