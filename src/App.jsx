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
import SearchLayout from './layouts/SearchLayout'
import FeedNotification from './layouts/FeedNotification'
import FeedHotel from './layouts/FeedHotel'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<FeedHome />} />
        <Route path="message" element={<FeedMessage />} />
        <Route path="friends" element={<FeedFriends />} />
        <Route path="notifications" element={<FeedNotification />} />
        <Route  path='search' element={<SearchLayout />} />
        <Route  path='hotels' element={<FeedHotel />} />
        <Route  path='marketplace' element={<SearchLayout />} />
        <Route  path='events' element={<SearchLayout />} />
      </Route>
      <Route  path="/login" element={<Login />} />
      <Route  path="/profile" element={<Login />} />
      <Route  path="/signup" element={<Signup />} />
      <Route  path="/forgetPassword" element={<ForgetPassword />} />
      <Route  path='/post/:postId' element={<ShowPost />} />
    </Routes>
  )
}

export default App
