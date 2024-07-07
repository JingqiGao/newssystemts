import { Button, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons'
export default function RightList() {
  const initialDataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  const [dataSource, setDataSource] = useState(initialDataSource)

  useEffect(() => {
    axios.get("http://localhost:8000/rights?_embed=children").then(res => {
      console.log(res.data)
      const list = res.data
      list[0].children = ""
      setDataSource(res.data)
    })
  }, [])
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
    },
    {
      title: 'path',
      dataIndex: 'key',
      render:(key: any) => {
        return <Tag color="orange">{key}</Tag>
      } 
    },
    {
      title: 'operation',
      render:() => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </div>
      }
    }
  ];
  
  
 
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}
