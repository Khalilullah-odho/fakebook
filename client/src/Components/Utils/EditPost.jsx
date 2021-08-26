import React, { useContext } from "react";
import { Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import { AuthContext } from "../../Context/auth";
const EditPost = ({ postId }) => {
  const context = useContext(AuthContext);

  const handleEdit = () => {
    context.editPost(postId);
  };

  return (
    <Button style={{ border: "none" }} onClick={handleEdit}>
      <EditFilled title="Edit" style={{ color: "steelblue" }} />
    </Button>
  );
};

export default EditPost;
