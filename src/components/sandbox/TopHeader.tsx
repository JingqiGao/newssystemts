import { Button, theme, Dropdown, Avatar } from 'antd'
import type { MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
export default function TopHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate();

  const {role: {roleName, rights}, username} = JSON.parse(localStorage.getItem("token") as string)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Super Admin',
    },
    {
      key: '2',
      danger: true,
      label: 'Exit',
      onClick: () => {
        localStorage.removeItem("token");
        navigate('/login');
      }
    }
  ];

  return (
    <Header style={{ padding: 0 , background: colorBgContainer}}>
    <div style={{float: "right"}}>
      <span>welcome back {username}</span>
      <Dropdown menu={{ items }}>
        <Avatar size="large" icon={<UserOutlined />}/>
        {/* <span>hover me</span> */}
      </Dropdown>
    </div>
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: '16px',
        width: 64,
        height: 64,
        background: colorBgContainer
      }}
    />
  </Header>
  )
}
