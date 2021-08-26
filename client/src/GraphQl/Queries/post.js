import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  query {
    getPosts {
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
      }
    }
  }
`;

export const GET_USER_POSTS = gql`
  query Query($username: String!) {
    getUserPosts(username: $username) {
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
