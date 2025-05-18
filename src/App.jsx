import React from 'react'
import {Routes,Route} from 'react-router-dom' 
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import ShowPost from './layouts/ShowPost'

const App = () => {
  return (
    <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/profile" element={<Login />} />
      <Route  path="/signup" element={<Signup />} />
      <Route  path="/forgetPassword" element={<ForgetPassword />} />
      <Route  path='/post' element={<ShowPost />} />
    </Routes>
  )
}

export default App
