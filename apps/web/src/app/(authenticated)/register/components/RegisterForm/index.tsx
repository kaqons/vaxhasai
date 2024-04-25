import React from 'react';
import { Button, Form } from 'antd';

const RegisterForm = ({ isLoading, onSubmit }) => {
  const handleSubmit = () => {
    onSubmit(); // Call the onSubmit function without any arguments
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Register as Guest
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
