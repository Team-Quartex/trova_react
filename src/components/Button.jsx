import React from 'react'

const Button = ({label,onClick}) => {
  return (
    <button onClick={onClick} className='rounded-2xl w-[90%] bg-primary text-white py-2 text-xl cursor-pointer w-full'>
        {label}
    </button>
  )
}

export default Button
