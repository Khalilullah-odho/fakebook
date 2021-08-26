import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button, Layout, Row, Col, DatePicker, Radio } from "antd";

import FormInput from "./FormInput";
import { AuthContext } from "../../Context/auth";
import { REGISTER_USER, LOGIN_USER } from "../../GraphQl/Mutations/auth";

const initialState = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
  dob: "",
  gender: "Male",
};

const AuthForm = (props) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isRegister, setIsRegister] = useState(false);

  const context = useContext(AuthContext);

  // REGISTER USER OR LOGIN USER
  const [addUser, { loading }] = useMutation(!isRegister ? LOGIN_USER : REGISTER_USER, {
    update(_, result) {
      const userData = result.data.login || result.data.register;
      context.login(userData);
      props.history.push("/");
    },
    onError(error) {
      const err = error.graphQLErrors[0].extensions;
      if (err.username) setErrors({ username: error.graphQLErrors[0].extensions.username });
      if (err.password) setErrors({ password: error.graphQLErrors[0].extensions.password });
      if (err.confirmPassword)
        setErrors({
          confirmPassword: error.graphQLErrors[0].extensions.confirmPassword,
        });
    },
    variables: { ...formData },
  });

  // FORM OPERATIONS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleChangeForm = () => {
    setIsRegister(!isRegister);
  };

  const handleSubmit = () => {
    addUser();
  };

  const onChange = (date, dateString) => {
    setFormData({ ...formData, dob: dateString });
    setErrors({});
  };

  return (
    <Layout.Content className="container">
      <Row gutter={[16, 16]} className="login-page">
        <Col style={{ margin: "auto" }} lg={12} md={12}>
          <div className="login-logo-section">
            <h1 className="logo align">Fakebook</h1>
            <h3 className="subtitle align">
              Fakebook helps you connect and share with the people in your life
            </h3>
          </div>
        </Col>

        <Col lg={12} md={12} span={24} style={{ margin: "auto" }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <FormInput
              help={errors.username ? errors.username : "Username is Case Sensitive"}
              errors={errors.username}
              name="username"
              message={errors.username ? errors.username : "Please input your Username!"}
              placeHolder="Username"
              value={formData.username}
              type="text"
              onChange={handleChange}
            />

            {isRegister && (
              <FormInput
                name="email"
                message="Please input your Email!"
                placeHolder="Email Address"
                value={formData.email}
                type="email"
                onChange={handleChange}
              />
            )}
            <FormInput
              help={errors.password ? errors.password : null}
              errors={errors.password}
              message={errors.password ? errors.password : "Please input your Password!"}
              name="password"
              placeHolder="Password"
              value={formData.password}
              type="password"
              onChange={handleChange}
            />
            {isRegister && (
              <>
                <FormInput
                  help={errors.confirmPassword ? errors.confirmPassword : null}
                  errors={errors.confirmPassword}
                  message={
                    errors.confirmPassword
                      ? errors.confirmPassword
                      : "Please Confirm your Password!"
                  }
                  name="confirmPassword"
                  placeHolder="Confirm Password"
                  value={formData.confirmPassword}
                  type="password"
                  onChange={handleChange}
                />
                <Form.Item label="Date Of Birth">
                  <DatePicker onChange={onChange} />
                </Form.Item>
                <Form.Item label="Gender">
                  <Radio.Group
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    value={formData.gender}
                  >
                    <Radio value={"Male"}>Male</Radio>
                    <Radio value={"Female"}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}

            <Form.Item className="formItem">
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                shape="round"
                size="large"
                block
              >
                {isRegister ? "Register" : "Log in"}
              </Button>
            </Form.Item>
            <div className="divider"></div>
            <Form.Item className="formItem">
              <Button size="large" type="default" block onClick={handleChangeForm}>
                {isRegister ? "Already have an account" : "Don't Have an account"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout.Content>
  );
};

export default AuthForm;
