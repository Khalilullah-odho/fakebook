import { gql } from "@apollo/client";

export const GET_FOLLOWERS = gql`
  query Query($username: String!) {
    getFollowers(username: $username) {
      id
      username
      followedAt
    }
  }
`;
