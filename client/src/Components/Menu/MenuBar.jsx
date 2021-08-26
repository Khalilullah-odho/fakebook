import React, { useContext } from "react";
import { Menu, Row, Col } from "antd";
import { AuthContext } from "../../Context/auth";
import { AiOutlineLogout, AiOutlineHome, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { NavLink as Link } from "react-router-dom";

const { Item } = Menu;

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);

  const { username } = user;

  return (
    <Row className="nav">
      <Col lg={6} md={6} sm={0}>
        <div className="header">Fakebook</div>
      </Col>

      <Col lg={12} md={12} sm={24} className="menu">
        <Menu
          mode="horizontal"
          key="menu"
          style={{
            width: "100%",
            justifyContent: "center",
            borderBottom: "none",
          }}
        >
          <Item key="home" style={{ margin: 10 }}>
            <Link to="/">
              <AiOutlineHome className="icons" /> <p className="text">Home</p>
            </Link>
          </Item>
          <Item key="profile" style={{ margin: 10 }}>
            <Link to={`/${username}`}>
              <AiOutlineUser className="icons" />
              <p className="text">Profile</p>
            </Link>
          </Item>
          <Item key="follower" title="Follower" style={{ margin: 10 }}>
            <Link to={`${username}/followers`}>
              <AiOutlineTeam className="icons" />
              <p className="text">Followers</p>
            </Link>
          </Item>
          <Item
            key="logout"
            title="Logout"
            style={{ margin: 10 }}
            onClick={() => {
              logout();
              window.location = "/login";
            }}
          >
            <Link to="/#">
              <AiOutlineLogout className="icons" />
              <p className="text">Logout</p>
            </Link>
          </Item>
        </Menu>
      </Col>
      <Col lg={6} md={6} sm={0} />
    </Row>
  );
};

export default MenuBar;
