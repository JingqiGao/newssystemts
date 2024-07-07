import React from 'react'
import {HashRouter, Route, Routes, Navigate} from 'react-router-dom'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import Login from '../views/login/Login'

function IndexRouter() {  
  return (
    <HashRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            {/* <Route path="*" element={!localStorage.getItem("token") ? <NewsSandBox />  : <Navigate replace to="/login" />}/> */}
            <Route path="*" element={<NewsSandBox />}/>

        </Routes>
    </HashRouter>
  )
}

export default IndexRouter