import React, { useContext } from "react";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";

import Comments from "../Utils/Comments";
import Likes from "../Utils/Likes";
import DeletePost from "../Utils/DeletePost";

import { AuthContext } from "../../Context/auth";
import EditPost from "../Utils/EditPost";

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="post-card">
      <div className="post-top">
        <div className="top-left">
          <Avatar
            style={{ backgroundColor: "#87d068", marginRight: 20 }}
            icon={<UserOutlined />}
          />
          <div>
            <Link to={`/${post.username}`}>
              <p style={{ fontWeight: 600 }}>{post.username}</p>
            </Link>
            <p className="post-date"> {moment(post.createdAt).fromNow(true)}</p>
          </div>
        </div>
        <div className="top-right">
          {user.username === post.username && (
            <>
              <div style={{ marginRight: 10 }}>
                <DeletePost postId={post.id} />
              </div>
              <div>
                <EditPost postId={post.id} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="post-middle">
        <Card
          style={{ padding: 10 }}
          bordered={false}
          actions={[
            <div className="post-actions">
              <Likes likes={post.likes} id={post.id} />
              <Comments comments={post.comment} id={post.id} user={user.username} />
            </div>,
          ]}
        >
          <p className="post-body" style={{ marginBottom: 10 }}>
            {post.body}
          </p>
          <img className="post-body" style={{ width: "100%" }} src={post.postPhoto} alt="" />
        </Card>
      </div>
    </div>
  );
};

export default Post;
