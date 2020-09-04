import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox, Card } from 'antd';

import CardWrapper from "./sharedComponents/CardWrapper";
import { login } from "../modules/actions/user";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const LoginForm = ({
  login,
  authenticated,
  history
}) => {
  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
  }, [authenticated]);

  const onFinish = values => {
    login(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <CardWrapper style={{ width: 640, margin: "auto" }} title="Come In">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{width: "100%"}}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </CardWrapper>
  );
};

export default connect(null, {
  login
})(LoginForm);