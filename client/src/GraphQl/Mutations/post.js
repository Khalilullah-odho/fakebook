import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($body: String!, $postPhoto: String!) {
    createPost(body: $body, postPhoto: $postPhoto) {
      id
      body
      postPhoto
      username
      userId
      createdAt
      comment {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost($postId: String!, $body: String!, $postPhoto: String!) {
    editPost(postId: $postId, body: $body, postPhoto: $postPhoto) {
      id
      body
      postPhoto
      username
      userId
      createdAt
      comment {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
