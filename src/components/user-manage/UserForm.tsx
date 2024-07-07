import { Form, Input, Select } from 'antd'
import React from 'react'

const UserForm = (props: any) => {
  return (
    <Form
    form = {props.form}
    layout="vertical"
  >
    <Form.Item
      name="username"
      label="User Name"
      rules={[{ required: true, message: 'Please input the user name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item name="password" label="Password" rules={
      [{
        required: true, message: 'Please input the password!'
      }]
    }>
      <Input type="textarea" />
    </Form.Item>
    
    <Form.Item name="region" label="Region" rules={
      [{
        required: true, message: 'Please input the pass word!'
      }]
    }>
      <Select
        options={props.regionList}
      />
    </Form.Item>

    <Form.Item name="roleId" label="Role" rules={
      [{
        required: true, message: 'Please input the pass word!'
      }]
    }>
      <Select onChange={(value) => {
        if (value === 1) {
          props.form.setFieldValue("region", "");
        }
      }}
        options={props.roleList.map((item: { id: any; roleName: any }) => ({value: item.id, label: item.roleName}))}
      />        
    </Form.Item>

    {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
      <Radio.Group>
        <Radio value="public">Public</Radio>
        <Radio value="private">Private</Radio>
      </Radio.Group>
    </Form.Item> */}
  </Form>
  )
}
export default UserForm