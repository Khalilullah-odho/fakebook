import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
  query Query($username: String!) {
    getUserInfo(username: $username) {
      id
      email
      username
      gender
      dob
      followers {
        id
        username
      }
    }
  }
`;
