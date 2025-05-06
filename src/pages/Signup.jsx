import React from 'react'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center  w-screen h-screen overflow-hidden'>
            <div className='w-[90vw] h-[90vh] flex flex-col lg:flex-row'>
              <div className='w-1/2 h-full bg-white px-20 hidden lg:block'>
                <img src="images/sgiriya.jpg" className=' object-cover h-full w-full rounded-4xl' alt="" />
              </div>
              <div className='w-full lg:w-1/2 h-full lg:block flex flex-col items-center justify-center'>
                <img src="images/logotrova-01.png" alt="logo" className='w-24' />
                <h2 className='text-5xl text-primary mt-4'>Hello There,</h2>
                <form className='mt-24 flex flex-col items-center justify-center gap-6 w-[90vw] lg:w-full '>
                  <TextInput type="text" placeholder="User Name"  />
                  <TextInput type="text" placeholder="Email"  />
                  <TextInput type="text" placeholder="What We call you"  />
                  <TextInput type="password" placeholder="Password" icon="fa-solid fa-eye" toggleable={true} />
                  
                  <Button label={"Sign up"} />
                  <div>Already Have an Account? <Link to={"/login"} className='text-primary hover:underline cursor-pointer'>Login Here</Link></div>
                </form>
                
              </div>
            </div>
        </div>
  )
}

export default Signup
