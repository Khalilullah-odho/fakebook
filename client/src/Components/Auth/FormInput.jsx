import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AiOutlineMail } from "react-icons/ai";

const FormInput = ({
  errors,
  name,
  message,
  placeHolder,
  value,
  onChange,
  type,
  disabled,
  help,
}) => {
  return (
    <Form.Item
      help={help}
      validateStatus={errors ? "error" : "success"}
      name={name}
      rules={[
        {
          required: true,
          message: { message },
        },
      ]}
    >
      {type === "password" ? (
        <Input.Password
          disabled={disabled}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      ) : (
        <Input
          type={type}
          disabled={disabled}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          prefix={
            name === "email" ? (
              <AiOutlineMail className="site-form-item-icon" />
            ) : (
              <UserOutlined className="site-form-item-icon" />
            )
          }
        />
      )}
    </Form.Item>
  );
};

export default FormInput;
