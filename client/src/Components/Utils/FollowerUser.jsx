import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER } from "../../GraphQl/Mutations/auth";
import { GET_USER_INFO } from "../../GraphQl/Queries/user";

const FollowUser = ({ userId, followers, username, user }) => {
  const [isFollowed, setIsFollwed] = useState(false);
  const [followUser, { loading }] = useMutation(FOLLOW_USER, {
    variables: { username: userId },
    update: (_, result) => {
      success(result.data.followUser);
    },
    refetchQueries: [{ query: GET_USER_INFO, variables: { username: user } }],
    onError: (error) => {
      failed(error.message);
    },
  });

  const success = (data) => {
    message.success(data, 3);
  };
  const failed = (data) => {
    message.error(data);
  };

  useEffect(() => {
    const follower = followers.find((f) => f.username === username);
    if (follower) {
      setIsFollwed(true);
    } else {
      setIsFollwed(false);
    }
  }, [followers, username]);

  return (
    <Button type="primary" style={{ marginTop: 10 }} onClick={followUser} loading={loading}>
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowUser;
