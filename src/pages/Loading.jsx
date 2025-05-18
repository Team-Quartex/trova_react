import React, { useState } from 'react'

const Loading = () => {
    const [loadingText,setLoadingText] = useState("LOADING");
    setTimeout(()=>{
        changeText();
    },1000);

    function changeText(){
        let word = loadingText+ ".";
        if(word.length===13){
            word = "LOADING";
        }
        setLoadingText(word);
    }
  return (
    <div className='w-screen h-screen flex items-center justify-center'> 
      <div className='h-56 flex items-center justify-center'>
        <img src="images/logo trova-02.png" alt="" srcset="" className='w-1/8' />
        <h1 className='text-9xl'>{loadingText}</h1>
      </div>
    </div>
  )
}

 export default Loading
