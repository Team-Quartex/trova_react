import React from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#f9f9f9]">
      {/* Side Image */}
      <div className="w-1/2 h-full hidden lg:block relative z-0">
      
        <img
          src="images/nine_arch.jpg"
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
        
      </div>

      {/* Gradient Fade Overlay (from right edge of image) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-l from-[#76c893]/30 via-[#f0fff1]/100 to-transparent/150" />
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6 sm:px-12 relative z-20">
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-12">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center mb-10">
            <img src="images/logotrova-01.png" alt="Logo" className="w-28" />
            <h1 className="text-5xl font-bold text-gray-800 mt-6">Welcome Back</h1>
            <p className="text-lg text-gray-500 mt-2">Log in to explore Palm City 🌴</p>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <TextInput type="text" placeholder="Username" icon="fa-regular fa-user" />
            <TextInput type="password" placeholder="Password" icon="fa-solid fa-eye" toggleable={true} />

            <div className="text-right text-sm">
              <Link to="/forgetPassword" className="text-[#1A8381] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="flex justify-center">

            <Button label="Login" onClick={handleLogin} />
            </div>

            <div className="text-center text-base text-gray-700 mt-5">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-[#1A8381] hover:underline font-semibold">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
