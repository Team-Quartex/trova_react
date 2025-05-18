import React from 'react'

const PostImage = ({images}) => {
    console.log(images.length)
    if(images.length===0){
        return(<></>)
    }
    if(images.length===1){
        return(<div className='w-full bg-red-300'>
            <img src={images[0]} alt="" className='object-cover' />
        </div>)
    }
    if(images.length===2){
        return(<div className='w-full bg-red-300'>
            {images.map(i=>(
                <img src={i} alt="" />
            ))}
        </div>)
    }
    if(images.length===4){
        return(<div className='w-full bg-red-300'>
            {images.map(i=>(
                <img src={i} alt="" />
            ))}
        </div>)
    }
}

export default PostImage
