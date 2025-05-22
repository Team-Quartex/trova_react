import React from 'react'
import { Link } from 'react-router-dom'

const NotificationPanel = ({onClick}) => {

  return (
    <div className='absolute w-72 min-h-8 p-3.5 bg-white z-50 right-0 mt-0.5 shadow rounded-2xl'>
      <div>
        <div>No notification</div>
      </div>
      <div>
        <hr />
        <Link to={'/notifications'} onClick={onClick} >
            show all notifications
        </Link>
      </div>
    </div>
  )
}

export default NotificationPanel
