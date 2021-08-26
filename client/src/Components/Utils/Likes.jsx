import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Comment, Avatar } from "antd";
import { LikeOutlined, LikeFilled, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../../GraphQl/Mutations/like";
import { FETCH_POSTS } from "../../GraphQl/Queries/post";
import postLike from "../../sounds/like-sound.mp3";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth";

const Likes = ({ id, likes }) => {
  const [liked, setLiked] = useState(false);
  const [viewLikes, setViewLikes] = useState(false);

  const { user } = useContext(AuthContext);
  const { username } = user;
  const likeSound = new Audio(postLike);

  useEffect(() => {
    if (username && likes.some((like) => like.username === username)) {
      setLiked(true);
    } else setLiked(false);
  }, [username, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    refetchQueries: [{ query: FETCH_POSTS }],

    onError(error) {
      setLiked(!liked);
    },
  });

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      likeSound.play();
    }
    likePost();
  };

  const handleOk = () => {
    setViewLikes(false);
  };

  const handleCancel = () => {
    setViewLikes(false);
  };

  return (
    <>
      <Modal
        style={{ top: 10 }}
        title="Likes"
        visible={viewLikes}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="closeBtn" block onClick={handleCancel} type="primary" shape="round">
            Close
          </Button>,
        ]}
      >
        {likes.map((l) => (
          <Comment
            key={l.id}
            author={
              <Link to={`/${l.username}`}>
                <h3 style={{ color: "black" }}>{l.username}</h3>
                <span className="post-data">Click to view profile</span>
              </Link>
            }
            avatar={<Avatar icon={<UserOutlined />} alt="Han Solo" />}
          />
        ))}
      </Modal>
      <div>
        {liked ? (
          <LikeFilled onClick={handleLike} style={{ color: "#1890ff" }} />
        ) : (
          <LikeOutlined onClick={handleLike} />
        )}

        <br />
        <span onClick={() => setViewLikes(!viewLikes)}>{likes.length} Likes</span>
      </div>
    </>
  );
};

export default Likes;
