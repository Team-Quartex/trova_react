import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError('');

    // Simulate sending code to email
    console.log(`Sending code to: ${email}`);

    // Navigate with email as state
    navigate('/reset-password', { state: { email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email to receive a verification code.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00bfa5] focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#00bfa5] hover:bg-[#009688] text-white font-semibold rounded-xl transition duration-200"
          >
            Send Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
