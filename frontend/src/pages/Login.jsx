/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
const [userId, setUserId] = useState('');

  
const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (currentState === 'SignUp') {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('token', token);

        // ✅ Decode and store userId
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userId = decoded.id;
        localStorage.setItem('userId', userId);

        toast.success("Signup successful!");
      } else {
        toast.error(response.data.message);
      }
    } else {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('token', token);

        // ✅ Decode and store userId
        const decoded = JSON.parse(atob(token.split('.')[1]));
       const userIdFromToken = decoded.id;
setUserId(userIdFromToken);
localStorage.setItem('userId', userIdFromToken);


        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Login failed");
      }

      console.log(response.config.data);
      console.log(userId)
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);
  useEffect(() => {
  if (userId) {
    console.log("Updated userId:", userId);
  }
}, [userId]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-500'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-800'></p>
        <p className='prata-regular font-bold text-2xl'>{currentState}</p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-800'></p>
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Enter Your Name'
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Enter Your E-mail'
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Enter Your Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p>Forget your Password</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('SignUp')} className='cursor-pointer'>
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Login Here
          </p>
        )}
      </div>

      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
