import postResolvers from "./post.js";
import userResolvers from "./user.js";
import commentResolvers from "./comment.js";
import followerResolver from "./follower.js";

export default {
  Query: {
    ...postResolvers.Query,
    ...commentResolvers.Query,
    ...userResolvers.Query,
    ...followerResolver.Query,
  },
  Mutation: {
    ...followerResolver.Mutation,
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
