import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Modal, Input, Form, Button, Comment, Avatar } from "antd";
import { CommentOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { CREATE_COMMENT } from "../../GraphQl/Mutations/comment";
import { FETCH_POSTS } from "../../GraphQl/Queries/post";
import DeleteComment from "./DeleteComment";

const Comments = ({ id, user, comments }) => {
  const [comment, setComment] = useState({ body: "" });
  const [viewComments, setViewComments] = useState(false);

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    variables: { postId: id, commentBody: comment.body },
    refetchQueries: [{ query: FETCH_POSTS }],
  });

  const handleModal = () => {
    setViewComments(false);
  };

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    createComment();
    setComment({ body: "" });
  };

  return (
    <>
      <Modal
        style={{ top: 10 }}
        title="Comments"
        visible={viewComments}
        onOk={handleModal}
        onCancel={handleModal}
        footer={[
          <Button key="closeBtn" block onClick={handleModal} type="primary" shape="round">
            Close
          </Button>,
        ]}
      >
        {comments.map((c) => (
          <div key={c.id}>
            <Comment
              className="comment-box"
              author={<h3 style={{ color: "black" }}>{c.username}</h3>}
              avatar={<Avatar icon={<UserOutlined />} alt="Han Solo" />}
              content={<p> {c.body} </p>}
              datetime={<span className="post-date">{moment(c.createdAt).fromNow()}</span>}
              actions={[user === c.username && <DeleteComment postId={id} commentId={c.id} />]}
            />
          </div>
        ))}
        <Form onFinish={handleSubmit} autoComplete="off">
          <Form.Item>
            <Input
              onChange={handleChange}
              value={comment.body}
              name="body"
              placeholder="write a comment"
              type="text"
              addonAfter={
                <Button
                  htmlType="submit"
                  style={{ border: "none" }}
                  size="small"
                  type="text"
                  icon={<SendOutlined />}
                  loading={loading}
                />
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <div onClick={() => setViewComments(!viewComments)}>
        <CommentOutlined /> <br />
        <span>{comments.length} Comments</span>
      </div>
    </>
  );
};

export default Comments;
