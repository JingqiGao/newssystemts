import React from 'react'
import { Button } from 'antd';
import axios from 'axios'

export default function Home() {
  
  const ajax = () => {
    axios.post("http://localhost:8000/posts", {title: "3333", author: "xiaoming"})
    axios.patch("http://localhost:8000/posts/1", {title: "1111-1111"})
    axios.get("http://localhost:8000/posts").then(res=>{
      console.log(res.data)
    })
  }

  return (
    <div>Home

      <Button type="primary" onClick={ajax}>Button</Button>

    </div>

  )
}
