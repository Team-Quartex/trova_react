import React from 'react'

const Section = ({title,childern}) => {
  return (
    <div className='w-full h-2/6 '>
        <h1 className='text-xl font-bold mb-0.5'>{title}</h1>
        <div className='bg-red-300 w-full h-10/12 rounded-3xl shadow'>
            {childern}
        </div>
    </div>
  )
}

export default Section
