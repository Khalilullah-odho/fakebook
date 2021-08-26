import React, { useContext } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { Row, Col, Button, Divider, Skeleton, Card } from "antd";

import { AiOutlineMail } from "react-icons/ai";
import { BsPersonSquare } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";

import MenuBar from "../Menu/MenuBar";
import Posts from "../Posts/Posts";
import { GET_USER_INFO } from "../../GraphQl/Queries/user";
import { GET_USER_POSTS } from "../../GraphQl/Queries/post";
import { AuthContext } from "../../Context/auth";
import FollowerUser from "../Utils/FollowerUser";
import { Link } from "react-router-dom";
import CreatePost from "../Utils/CreatePost";

const Profile = (props) => {
  const { user } = useContext(AuthContext);
  const { username } = user;
  const profileUsername = props.match.params.username;

  const { data: { getUserInfo } = {}, loading: userLoading } = useQuery(GET_USER_INFO, {
    variables: { username: profileUsername },
  });
  const { data: { getUserPosts } = {}, loading: postsLoading } = useQuery(GET_USER_POSTS, {
    variables: { username: profileUsername },
    pollInterval: 1000,
  });

  return (
    <>
      <MenuBar />
      <Row>
        <Col lg={6} md={6} sm={0} />
        <Col lg={12} md={12} sm={24} className="profile-page">
          {userLoading || postsLoading ? (
            [...Array(5)].map((_, index) => (
              <Skeleton className="loading" active key={index} />
            ))
          ) : (
            <>
              <div className="profile-page" style={{ backgroundColor: "#fff" }}>
                <div className="profile-cover">
                  <div className="profile-pic"></div>
                </div>
                <div className="profile-name">
                  <h1> {getUserInfo.username} </h1>
                  {username !== getUserInfo.username && (
                    <FollowerUser
                      userId={getUserInfo.username}
                      username={username}
                      followers={getUserInfo.followers}
                      user={profileUsername}
                    />
                  )}
                </div>
                <div className="profile-info">
                  <Button type="text">
                    <Link to={`/${profileUsername}/followers`}>Followers</Link>
                  </Button>
                  <Divider orientation="center" type="vertical" />
                  <Button type="text">Info</Button>
                  <Divider type="vertical" />
                  <Button type="text">Timeline</Button>
                </div>
                <Card title="Info" type="inner" style={{ marginTop: 10 }}>
                  <div className="info-data">
                    <AiOutlineMail style={{ color: "grey" }} />
                    <p style={{ marginLeft: 10 }}> {getUserInfo.email}</p>
                  </div>
                  <div className="info-data">
                    <BsPersonSquare style={{ color: "grey" }} />
                    <p style={{ marginLeft: 10 }}> {getUserInfo.gender} </p>
                  </div>
                  <div className="info-data">
                    <FaBirthdayCake style={{ color: "grey" }} />
                    <p style={{ marginLeft: 10 }}>
                      {moment(getUserInfo.dob).format("D MMMM, YYYY")}
                    </p>
                  </div>
                  <div className="info-data">
                    <p style={{ marginLeft: 10 }}>
                      Followers : {getUserInfo.followers.length}
                    </p>
                  </div>
                </Card>
              </div>

              <div style={{ backgroundColor: "#f0f2f5", marginTop: 20 }}>
                {username === getUserInfo.username && (
                  <div style={{ marginBottom: 10, zIndex: 0 }}>
                    <CreatePost posts={getUserPosts} />
                  </div>
                )}
                <Posts posts={getUserPosts} />
              </div>
            </>
          )}
        </Col>
        <Col lg={6} md={6} sm={0} />
      </Row>
    </>
  );
};

export default Profile;
