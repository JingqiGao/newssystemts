import { Button, Form, Input, Modal, Radio, Select, Switch, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined} from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm';

type User = {
  id: number;
  region: string;
  roleId: number;
  username: string;
  roleState: boolean;
  password: string;
  role: Role;
};

type Role = {
  id: number,
  roleName: string,
  roleType: 1,
}

export default function RightList() {
  const initialDataSource =  [] as User[];
  const [userList, setUserList] = useState(initialDataSource)
  const [open, setOpen] = useState(false);
  const [isUpdateVisible, setUpdateVisible] = useState(false);
  const [roleList, setRoleList] = useState([] as Role[]);
  const [regionList, setRegionList] = useState([] as any[]);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [current, setCurrent] = useState<User>();
  useEffect(() => {
    axios.get("http://localhost:8000/users?_expand=role").then(res => {
      console.log(res.data)
      const list = res.data
      list[0].children = ""
      setUserList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8000/regions").then(res => {
      setRegionList(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8000/roles").then(res => {
      setRoleList(res.data)
    })
  }, [])
  
  const columns = [
    {
      title: 'Region',
      dataIndex: 'region',
      render: (region: string) => {
        return <b>{region ===""?'global':region}</b>
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render:(role: Role) => {
        return role.roleName;
      }
    },
    {
      title: 'UserName',
      dataIndex: 'username',
      render:(key: any) => {
        return <Tag color="orange">{key}</Tag>
      } 
    },
    {
      title: 'RoleState',
      dataIndex: 'roleState',
      render:()=>{
        return <Switch></Switch>
      }
    },
    {
      title: 'operation',
      render:(item: any) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}/>
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleUpdateUser(item)} />
        </div>
      }
    }
  ];

  const confirmMethod = (item: User) => {
    Modal.confirm({
      title: "Are you sure to delete?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log(item);
        handleDeleteUser(item.id)
      },
    });
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      // Replace 'http://localhost:3001/users/' with your actual server endpoint
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // If the deletion was successful, remove the user from the local state
      setUserList(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleUpdateUser = (item: User) => {
    setUpdateVisible(true);
    setCurrent(item);
    updateForm.setFieldsValue(item);
  }

  const handleUpdateUserRequest = async (updatedUser: User) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${updatedUser.id}`, {
        method: 'PUT', // or 'PATCH' if you want to partially update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newUser = await response.json();
      await axios.get("http://localhost:8000/users?_expand=role").then(res => {
        console.log(res.data)
        const list = res.data
        list[0].children = ""
        setUserList(res.data)
      });
      setUpdateVisible(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };


  const handleAddUser = async (newUser: User) => {
    try {
      // Assuming you have a backend endpoint that accepts POST requests to add a user
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // If your backend responds with the newly added user, you can directly use it to update the state
      const addedUser = await response.json();
      await axios.get("http://localhost:8000/users?_expand=role").then(res => {
        console.log(res.data)
        const list = res.data
        list[0].children = ""
        setUserList(res.data)
      });

      setOpen(false);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };
  
  return (
    <div>
      <Button type="primary" onClick={
        ()=>{
          setOpen(true)
        }
      }>Add User</Button>
      <Table dataSource={userList} columns={columns} 
        pagination={{
          pageSize:5
        }}
        rowKey={item => item.id}
        />

<Modal
      open={open}
      title="New User"
      okText="Create"
      cancelText="Cancel"
      onCancel={()=>{
        setOpen(false)
      }}
      onOk={() => {
        console.log("add", form)
        form.validateFields().then((value) => {
          form.resetFields();
          handleAddUser(value);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
      }}
    >
      <UserForm regionList={regionList} roleList={roleList} form={form}></UserForm>
     
    </Modal>

    <Modal
      open={isUpdateVisible}
      title="Update User"
      okText="Update"
      cancelText="Cancel"
      onCancel={()=>{
        setUpdateVisible(false)
      }}
      onOk={() => {
        console.log("update", form)
        updateForm.validateFields().then((value) => {
          updateForm.resetFields();
          handleUpdateUserRequest({...current, ...value} as User);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
      }}
    >
      <UserForm regionList={regionList} roleList={roleList} form={updateForm}></UserForm>
     
    </Modal>
    </div>
  )
}
