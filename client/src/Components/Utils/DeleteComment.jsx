import { useMutation } from "@apollo/client";
import React from "react";
import { DELETE_COMMENT } from "../../GraphQl/Mutations/comment";
import { FETCH_POSTS } from "../../GraphQl/Queries/post";

const DeleteComment = ({ postId, commentId }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { postId, commentId },
    refetchQueries: [{ query: FETCH_POSTS }],
  });

  return <span onClick={deleteComment}>Delete</span>;
};

export default DeleteComment;
