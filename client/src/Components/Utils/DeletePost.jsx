import React from "react";
import { Button, Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../GraphQl/Mutations/post";
import { FETCH_POSTS } from "../../GraphQl/Queries/post";

const DeletePost = ({ postId }) => {
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    variables: { postId: postId },
    refetchQueries: [{ query: FETCH_POSTS }],
    onError(error) {
      console.log(error);
    },
  });

  const handleSubmit = () => {
    deletePost();
  };

  return (
    <>
      <Popconfirm title="Are you sure to delete the post" onConfirm={handleSubmit}>
        <Button
          htmlType="submit"
          style={{ border: "none" }}
          icon={<DeleteFilled title="Delete" style={{ color: "#D11A2A" }} />}
          loading={loading}
        />
      </Popconfirm>
    </>
  );
};

export default DeletePost;
