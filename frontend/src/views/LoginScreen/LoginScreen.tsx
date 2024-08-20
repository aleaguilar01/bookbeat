import React, { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { Form, Input, Button } from "antd";
import { jwtDecode } from "jwt-decode";

const LoginScreen = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decoded = jwtDecode < {name: string, email: string, picture: string, sub: string} > (response.credential);
    // decode the jwt token // npm i jwt-decode
    // Create hook that sends this information to the backend
    //  axios.post("/social-auth", {})
    login({
      name: decoded.name,
      email: decoded.email,
      profile_picture: decoded.picture,
      provider_id: decoded.sub
    });
    navigate("/")
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      {/* <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form> */}
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </div>
  );
};

export default LoginScreen;
