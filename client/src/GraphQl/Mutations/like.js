import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation LikePostMutation($postId: String!) {
    likePost(postId: $postId) {
      id
      body
      createdAt
      username
      comment {
        id
        body
        createdAt
        username
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
