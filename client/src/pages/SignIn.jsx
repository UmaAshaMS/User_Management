import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import OAuth from '../Components/OAuth'

function SignIn() {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state) => state.user)
  const [errormsg, setErrorMsg] = useState('')

  // console.log(loading, error)
   
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
      setErrorMsg('All feilds are required!')
      return
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if(!emailPattern.test(formData.email)){
      setErrorMsg('EmailID not valid!')
      return
    }

    try{
      dispatch(signInStart());
      const res = await fetch ('/api/auth/signin', {
        method : 'POST',
        headers : {
          'content-Type' : 'application/json',
        },
        body :JSON.stringify(formData)
    })
    const data  = await res.json();
    
    if(data.success === false){
      dispatch(signInFailure(data.message))
      console.log("Login NOT successful, navigating to home");

      return;
    }
    dispatch(signInSuccess(data))
    console.log("Login successful, navigating to home");
    navigate('/', { replace: true })
    }
    catch(error){
      dispatch(signInFailure(error.message))
    }
    

    }
  return (
    <div className=' max-w-lg mx-auto h-screen'>
      <h1 className='text-3xl text-center font-bold m-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>

        
        <input
          placeholder='Email ID :'
          type='email'
          id='email'
          className='bg-red-50 p-2.5 rounded-lg'
          onChange={handleChange} />

        <input
          placeholder='Password :'
          type='password'
          id='password'
          className='bg-red-50 p-2.5  rounded-lg'
          onChange={handleChange} />

        <div className='flex justify-center items-center'>
          <button className='cursor-pointer w-60 bg-red-100 p-3 text-center rounded-full hover:bg-red-300 transition'>{loading ? 'Loading...' : 'Sign in'}</button>
          
        </div>
        <OAuth />
        {/* <button className='cursor-pointer'>SignIn via Google</button> */}
      </form>

    

      <div className='flex gap-2 mt-5'>
        <p className='text-black-600'>New User ? </p>
        <Link to='/signup' >
          <span className='text-blue-500 flex'>Sign Up </span>
        </Link>
      </div>
      <p className='text-red-600 mt-5'>{error ? error || 'Something went wrong!' : '' }</p>
      <p className='text-red-600 mt-5'>{errormsg ? errormsg  : '' }</p>

      

    </div>
  )
}

export default SignIn

