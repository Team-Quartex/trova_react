import React from 'react'

const Button = ({label,onClick}) => {
  return (
    <button onClick={onClick} className='rounded-2xl w-[90%] bg-primary text-white py-1 text-xl cursor-pointer'>
        {label}
    </button>
  )
}

export default Button
