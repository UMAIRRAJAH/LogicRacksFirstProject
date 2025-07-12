import axios from 'axios';
import React, { useState } from 'react'
import {backendUrl} from'../App'
import { toast } from 'react-toastify';
const Login = ({setToken}) => {
    const [email,setEmail]= useState('');
    const [password,setPassword]=useState('')
    const onSubmitHandler =async(e)=>{
        try{
            e.preventDefault();
            
            const response=await axios.post(backendUrl+'/api/user/admin',{email,password})
            console.log(response)
            if(response.data.success){
              setToken(response.data.token)
            }else{
              toast.error(response.data.message)
            }

        }catch(error){
  console.log('Login failed:', error);
  const errorMessage = error.response?.data?.message || "An unexpected error occurred";
  toast.error(errorMessage);
}


    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-27'>
                    <p className='text-sm font-bold text-gray-800 mb-2 text-center'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='rounded-md w-full px-3 py-2 border pl-8 border-gray-300 outline-none' placeholder='your@email.com' required/>
                </div>
                 <div className='mb-3 min-w-27'>
                    <p className='text-sm font-bold text-gray-800 mb-2 text-center'>Enter Your Passord</p>
                    <input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='rounded-md w-full px-3 py-2 pl-8 border border-gray-300 outline-none ' placeholder='Enter Your Passowrd' required/>
                </div>
                <button className='mt-2 w-full my-2 px-4 rounded-md  text-white font-bold bg-black items-center' type='submit'>login</button>
            </form>
        </div>
    </div>
  )
}

export default Login