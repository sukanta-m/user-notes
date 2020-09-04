import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Card } from 'antd';

import { registerAction } from "../modules/actions/user";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SignupForm = ({
  register,
  authenticated,
  history
}) => {
  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
  }, [authenticated]);

  const onFinish = values => {
    register(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card style={{ width: 640, margin: "auto" }} title="Create Account">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item
          label="Confirm Password"
          name="passwordConfirmation"
          rules={[{ required: true, message: 'Please input confirm password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{width: "100%"}}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default connect(null, {
  register: registerAction
})(SignupForm);