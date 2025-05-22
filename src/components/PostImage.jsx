import React from 'react'

const PostImage = ({images}) => {
    console.log(images.length)
    if(images.length===0){
        return(<></>)
    }
    if(images.length===1){
        return(<div className='w-full bg-red-300 grid grid-cols-1 grid-rows-1 gap-0.5'>
            <img src={images[0]} alt="" className='object-cover ' />
        </div>)
    }
    if(images.length===2){
        return(<div className='grid grid-cols-2 grid-rows-1 gap-0.5'>
            {images.map(i=>(
                <img src={i} alt="" className='object-cover ' />
            ))}
        </div>)
    }
    if(images.length===3){
        return(<div className='w-full  grid grid-cols-3 grid-rows-1 gap-0.5'>
            {images.map(i=>(
                <img src={i} alt=""  className='object-cover ' />
            ))}
        </div>)
    }
    if(images.length===4){
        return(<div className='w-full  grid grid-cols-2 grid-rows-2 gap-0.5'>
            {images.map(i=>(
                <img src={i} alt="" className='object-cover ' />
            ))}
        </div>)
    }
    if (images.length === 5) {
        return (
            <div className="w-full grid grid-cols-6 grid-rows-7 gap-0.5">
                <img src={images[0]} alt="" className="col-span-3 row-span-4 object-cover " />
                <img src={images[1]} alt="" className="col-start-4 col-span-3 row-span-4 object-cover " />
                <img src={images[2]} alt="" className="col-span-2 row-start-5 row-span-3 object-cover " />
                <img src={images[3]} alt="" className="col-start-3 col-span-2 row-start-5 row-span-3 object-cover " />
                <img src={images[4]} alt="" className="col-start-5 col-span-2 row-start-5 row-span-3 object-cover " />
            </div>
        );
    }
}

export default PostImage
