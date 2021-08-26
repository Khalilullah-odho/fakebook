import React from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../GraphQl/Queries/Follower";
import MenuBar from "../Menu/MenuBar";
import { Card, Col, Row, Skeleton, Avatar } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const Followers = (props) => {
  const profileUsername = props.match.params.username;
  const { data: { getFollowers } = {}, loading } = useQuery(GET_FOLLOWERS, {
    variables: { username: profileUsername },
  });

  if (!loading) console.log(getFollowers);

  return (
    <>
      <MenuBar />
      <Row>
        <Col lg={6} md={6} sm={0} />
        <Col lg={12} md={12} sm={24} className="profile-page">
          {loading ? (
            [...Array(5)].map((_, index) => (
              <Skeleton className="loading" active key={index} />
            ))
          ) : (
            <Card title="Followers" style={{ marginTop: 10 }}>
              {getFollowers.map((f) => (
                <div key={f.id} className="followers">
                  <Link to={`/${f.username}`} style={{ marginBottom: 10 }}>
                    <span style={{ marginRight: 10 }}>
                      <Avatar icon={<UserOutlined />} />
                    </span>
                    {f.username}

                    <span className="post-date">
                      {" at "} {moment(f.followedAt).format("D MM YYYY")}
                    </span>
                  </Link>
                </div>
              ))}
            </Card>
          )}
        </Col>
        <Col lg={6} md={6} sm={0} />
      </Row>
    </>
  );
};

export default Followers;
