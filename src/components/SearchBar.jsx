import React from 'react'

const SearchBar = ({onChange}) => {
  return (
    <div className='w-full py-2'>
        <input type="Search" placeholder='Search Hotels' className='shadow w-full h-[5vh] rounded-xl px-1 focus:outline-none'/>
    </div>
  )
}

export default SearchBar
