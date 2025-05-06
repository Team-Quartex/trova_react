import React from 'react'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const LoginApp =(e)=>{
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className='flex flex-col items-center justify-center  w-screen h-screen overflow-hidden'>
        <div className='w-[90vw] h-[90vh] flex flex-col lg:flex-row'>
          <div className='w-1/2 h-full bg-white px-20 hidden lg:block'>
            <img src="images/nine_arch.jpg" className=' object-cover h-full w-full rounded-4xl' alt="" />
          </div>
          <div className='w-full lg:w-1/2 h-full lg:block flex flex-col items-center justify-center'>
            <img src="images/logotrova-01.png" alt="logo" className='w-24' />
            <h2 className='text-5xl text-primary mt-4'>Welcome,</h2>
            <form className='mt-24 flex flex-col items-center justify-center gap-6 w-[90vw] lg:w-full '>
              <TextInput type="text" placeholder="username" icon="fa-regular fa-user" />
              <TextInput type="password" placeholder="Password" icon="fa-solid fa-eye" toggleable={true} />
              <Link to={"/forgetPassword"} className='text-primary text-xs cursor-pointer hover:underline w-[90%]'>Forget Password?</Link>
              <Button onClick={LoginApp} label={"Login"} />
              <div className='w-[90%]'>Don't Have an Account? <Link to={"/signup"} className='text-primary hover:underline cursor-pointer'>Create Account</Link></div>
            </form>
            
          </div>
        </div>
    </div>
  )
}

export default Login
