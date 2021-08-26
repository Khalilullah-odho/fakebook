import React from "react";
import { useQuery } from "@apollo/client";
import { Col, Row, Skeleton } from "antd";

import Posts from "../Posts/Posts";
import CreatePost from "../Utils/CreatePost";
import MenuBar from "../Menu/MenuBar";

import { FETCH_POSTS } from "../../GraphQl/Queries/post";

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS, {
    pollInterval: 500,
  });

  return (
    <>
      <MenuBar />
      <Row>
        <Col lg={6} md={6} sm={0} />
        <Col lg={12} md={12} sm={24} className="main-page">
          <div className="post-main-box">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <Skeleton className="loading" active key={index} />
              ))
            ) : (
              <Posts posts={posts} />
            )}
          </div>
          <CreatePost posts={posts} />
        </Col>
        <Col lg={6} md={6} sm={0} />
      </Row>
    </>
  );
};

export default Home;
