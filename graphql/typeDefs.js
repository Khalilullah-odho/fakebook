import { gql } from "apollo-server";

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    postPhoto: String!
    createdAt: String!
    username: String!
    userId: String!
    comment: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Followers {
    id: ID!
    username: String!
    followedAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String
  }

  type UserInfo {
    id: ID!
    email: String!
    username: String!
    dob: String!
    gender: String!
    followers: [Followers]!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    dob: String!
    gender: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
    getUserInfo(username: String!): UserInfo!
    getUserPosts(username: String!): [Post]
    getFollowers(username: String!): [Followers]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!, postPhoto: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    editPost(postId: String!, body: String!, postPhoto: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!
    likePost(postId: String!): Post!
    followUser(username: String!): String!
  }
`;

export default typeDefs;
