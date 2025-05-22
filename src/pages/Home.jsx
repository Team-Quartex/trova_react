import React, { useState } from 'react'
import ProfileNav from '../components/ProfileNav'
import RightLayout from '../layouts/RightLayout'
import { Link, Outlet,useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import NotificationPanel from '../components/NotificationPanel'

const Home = () => {
  const location = useLocation();
  const [showNotification,setShowNotification] = useState(false);

  const toggleNotication = (e)=>{
    setShowNotification(!showNotification);
  }
  // Determine title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'Feed';
    if (path === '/message') return 'Messages';
    if (path === '/friends') return 'Friends';
    if (path === '/notifications') return 'Notifications';
    if (path === '/search') return 'Search';
    return 'Page';
  };
  return (
    <div className='w-screen h-screen overflow-hidden flex '>
      <ProfileNav></ProfileNav>
      <div className='w-[60vw] h-screen px-3 pt-2 '>
        <div className='flex justify-between items-center mb-2 px-1'>
          <h1 className='text-2xl font-bold'>{getPageTitle()}</h1>
            <div className='flex items-center justify-center gap-1'>
              <Link to={"/setting"} className='bg-primary p-2 rounded-[50%]'>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E"
                alt="Search" width="20" height="20" />
            </Link>
            <div  className='relative'>
              <button onClick={toggleNotication} className='bg-primary p-2 rounded-[50%]'>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E"
                alt="Search" width="20" height="20" />
              </button>
              {showNotification && <NotificationPanel onClick={toggleNotication}/>}
            </div>
            {getPageTitle()!="Search" && <Link to={"/search"} className='bg-primary p-2 rounded-[50%]'>
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E"
                alt="Search" width="20" height="20" />
            </Link>}
            </div>
        </div>
        <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='h-full overflow-y-auto'
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
      </div>
      <RightLayout></RightLayout>
    </div>
  )
}

export default Home
