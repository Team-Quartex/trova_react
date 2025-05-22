import React from 'react'

const SearchLayout = () => {
  return (
    <div>
    <div>
        <input type="search"  className='shadow-2xl  w-full px-3 py2 focus:outline-none' placeholder='Search here......' />
    </div>
    <div className='w-full h-full bg-amber-500'>
        <div className='w-[10vh] h-[15vh] bg-amber-700'>

        </div>
    </div>
    </div>
  )
}

export default SearchLayout
