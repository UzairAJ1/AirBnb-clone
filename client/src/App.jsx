
import { Route, Routes } from 'react-router-dom'
import Testing from './components/Testing'
import Layouts from './layouts/Layout'
import Login from './components/Login'
import Register from './components/Register'
import Index from './components/Start'
import Account from './components/Account'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'
import { useContext, useEffect, useState } from 'react'

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;
function App() {
//const [user,setUser]=useState(null);

 

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<Index />}></Route>
          <Route path='login' element={<Login />}></Route>
          
          <Route path='account' element={<Account />}></Route>
          <Route path='register' element={<Register />}></Route>
          {/* <Route path='account/places/new' element={<Account />}></Route> */}
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
