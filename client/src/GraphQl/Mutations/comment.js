import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation Mutation($postId: String!, $commentBody: String!) {
    createComment(postId: $postId, body: $commentBody) {
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

export const DELETE_COMMENT = gql`
  mutation Mutation($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
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
