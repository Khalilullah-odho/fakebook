import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, message, Modal } from "antd";
import FileBase from "react-file-base64";
import { SendOutlined } from "@ant-design/icons";
import { CREATE_POST, EDIT_POST } from "../../GraphQl/Mutations/post";
import { FETCH_POSTS } from "../../GraphQl/Queries/post";
import postSound from "../../sounds/post-sound.mp3";
import { AuthContext } from "../../Context/auth";

const CreatePost = ({ posts }) => {
  const [isForm, setIsForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postData, setPostData] = useState({ body: "", postPhoto: "" });
  const postSuccessfull = new Audio(postSound);

  const { postId, cancelEditPost } = useContext(AuthContext);

  useEffect(() => {
    if (postId) {
      const { body, postPhoto } = posts.find((post) => post.id === postId);
      setIsForm(true);
      setIsEdit(true);
      mapTopModel(body, postPhoto);
    }
  }, [postId, posts]);

  const mapTopModel = (body, postPhoto) => {
    setPostData({ body, postPhoto });
  };

  const [editPost, { loading: editLoading }] = useMutation(EDIT_POST, {
    variables: { postId, body: postData.body, postPhoto: postData.postPhoto },
    refetchQueries: [{ query: FETCH_POSTS }],

    onError: (error) => {
      console.log(error);
    },
  });

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: postData,
    refetchQueries: [{ query: FETCH_POSTS }],
    onError(error) {
      message.error(error.message, 2);
    },
  });

  const handleSubmit = () => {
    if (isEdit) {
      editPost();
    } else {
      createPost();
    }
    postSuccessfull.play();
    handleModal();
  };

  const handleModal = () => {
    setIsForm(false);
    setIsEdit(false);
    cancelEditPost();
    postData.body = "";
    postData.postPhoto = "";
  };

  return (
    <>
      <Modal
        onCancel={handleModal}
        onOk={handleModal}
        visible={isForm}
        title={isEdit ? "Edit Post" : "Create a post"}
        footer={[
          <Button key="closeBtn" onClick={handleModal} type="primary" shape="round">
            Cancle
          </Button>,
          <Button
            key="postBtn"
            type="primary"
            htmlType="submit"
            shape="round"
            onClick={handleSubmit}
            loading={isEdit ? editLoading : loading}
          >
            Post
          </Button>,
        ]}
      >
        <Form initialValues={true} layout="inline" className="create-post">
          <Form.Item rules={[{ required: true }]} className="post-input">
            <Input.TextArea
              autoSize
              name="body"
              value={postData.body}
              placeholder="What's on your mind"
              onChange={(e) => setPostData({ ...postData, body: e.target.value })}
              bordered={false}
              style={{ backgroundColor: "#fff" }}
            />
          </Form.Item>
          <Form.Item className="post-input">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setPostData({ ...postData, postPhoto: base64 })}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Input
        placeholder="What's on your mind?"
        onClick={() => setIsForm(true)}
        addonAfter={<SendOutlined />}
      />
    </>
  );
};

export default CreatePost;
