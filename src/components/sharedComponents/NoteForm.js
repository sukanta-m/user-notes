import React, { useState } from "react";
import { Form, Modal, Button, Input, Select } from "antd";
import CKEditor from 'ckeditor4-react';
import styled from "styled-components";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const NoteForm = ({
  handleCancel,
  addNote,
  updateNote,
  loading,
  note: { id, title, body, tags }
}) => {
  const [modifiedBody, setBody] = useState(body);

  const onFinish = values => {
    if (id) {
      updateNote({
        ...values,
        body: modifiedBody,
        id
      })
    } else {
      addNote({
        ...values,
        body: modifiedBody
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChangeBody = evt => setBody(evt.editor.getData());

  return (
    <Modal
      visible
      title={id ? "Updat Note" : "Add Note"}
      onOk={addNote}
      onCancel={handleCancel}
      footer={false}
      width={"70%"}
    >
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        initialValues={{title, tagList: tags.map(tag => tag.name), body: modifiedBody}}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please enter body!' }]}
        >
          <CKEditor
            data={body}
            type="classic"
            onChange={onChangeBody}
          />
        </Form.Item>
        <Form.Item
          label="Tags"
          name="tagList"
          rules={[{ required: true, message: 'Please enter tags!' }]}
        >
          <Select mode="tags" style={{ width: '100%' }} />
        </Form.Item>
        <StyledFooter>
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>
          <Button key="submit" type="primary" htmlType="submit" loading={loading}>
            {id ? "Update" : "Add"}
          </Button>
        </StyledFooter>
      </Form>
    </Modal>
  );
};

const StyledFooter = styled.div`
text-align: right;
button {
  margin-left: 10px;
}
`;

export default NoteForm;