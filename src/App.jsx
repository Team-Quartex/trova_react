import React from 'react'
import {Routes,Route} from 'react-router-dom' 
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import ShowPost from './layouts/ShowPost'
import FeedHome from './layouts/FeedHome'
import FeedMessage from './layouts/FeedMessage'
import FeedFriends from './layouts/FeedFriends'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<FeedHome />} />
        <Route path="message" element={<FeedMessage />} />
        <Route path="friends" element={<FeedFriends />} />
        <Route path="notification" element={<FeedHome />} />
        <Route  path='search' element={<ShowPost />} />
      </Route>
      <Route  path="/login" element={<Login />} />
      <Route  path="/profile" element={<Login />} />
      <Route  path="/signup" element={<Signup />} />
      <Route  path="/forgetPassword" element={<ForgetPassword />} />
      <Route  path='/post' element={<ShowPost />} />
    </Routes>
  )
}

export default App
