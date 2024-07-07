import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import {Route, Routes, Navigate} from 'react-router-dom'
import UserList from './user-manage/UserList'
import RoleList from './right-manager/RoleList'
import RightList from './right-manager/RightList'
import Home from './home/Home'
import Nopermission from './nopermission/Nopermission'
import { Layout, theme } from 'antd'
import './NewsSandBox.css'
const { Header, Sider, Content } = Layout;


export default function NewsSandBox() {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/user-manage/list" element={<UserList/>}/>
                        <Route path="/right-manage/role/list" element={<RoleList/>}/>
                        <Route path="/right-manage/right/list" element={<RightList/>}/>
                        <Route path="/" element={<Navigate to="/home" replace />}/>
                        <Route path="*" element={<Nopermission/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}