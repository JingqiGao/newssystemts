import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import './index.css'
import {
  UserOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function SideMenu(props: any ) {
  const [menu, setMenu] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:8000/rights?_embed=children").then(res=>{
      console.log(res.data)
      setMenu(res.data)
    })
  }, [])

  type MenuItem = Required<MenuProps>['items'][number];
  const navigate = useNavigate();
  
  const getMenu = (menuList: any[]): MenuItem[] => {
    return menuList.map(item => {
      if (item.pagepermisson !== 1) {
        return null;
      }
      if(item.children?.length > 0) {
        return getItem(item.title, item.key, iconList.get(item.key), getMenu(item.children))
      } else {
        return getItem(item.title, item.key, iconList.get(item.key))
      }
    })
  }

  const iconList = new Map<String, React.ReactNode>([
    ["/home",<UserOutlined/>],
    ["/user-manage/list", <UserOutlined/>],
    ["/right-manage/role/list", <UserOutlined/>],
    ["/right-manage/right/list", <UserOutlined/>]
  ])

  const renderMenu = (menuList: any[]): MenuProps['items'] => {
    return getMenu(menuList)
  }

  function getItem(
    label: React.ReactNode,  
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  

  // const items: MenuProps['items'] = [
  //   {
  //     key: '/home',
  //     icon: <UserOutlined />,
  //     label: 'Home',
  //   },
  //   {
  //     key: '/user-manage',
  //     icon: <UserOutlined />,
  //     label: 'User',
  //     children: [
  //       {key: "/user-manage/list",
  //       label: "User list",
  //        icon: <UserOutlined />
  //       }
  //     ]
  //   },
  //   {
  //     key: '/right-manage',
  //     icon: <UserOutlined />,
  //     label: 'Right Management',
  //     children:[
  //       {
  //         key:"/right-manage/role/list",
  //         label: "Role list",
  //         icon: <UserOutlined />
  //       },
  //       {
  //         key:"/right-manage/right/list",
  //         label: "Right list",
  //         icon: <UserOutlined />
  //       }
  //     ]
  //   },
  //   {
  //     key: '4',
  //     icon: <UserOutlined />,
  //     label: 'User Management',
  //     children:[{
  //       key:'5',
  //       label:'Option9'
  //     }]
  //   },
  // ]
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const { pathname } = useLocation();

  console.log(pathname)
  const selectKeys = [pathname]
  const paths = pathname.split("/")
  // paths.splice(paths.length - 1)
  const openKeys = ["/" + paths[1]]
  console.log(openKeys)

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{display:"flex", height:"100%", flexDirection:"column"}}>
        <div className="logo">News feed system </div>
        <div style={{flex:1, overflow: "auto"}}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectKeys}
          defaultOpenKeys={openKeys}
          onClick={onClick}
          items={renderMenu(menu)}
        />
        </div>
      </div>
      </Sider>
  )
}
// export default withRouter(SideMenu)