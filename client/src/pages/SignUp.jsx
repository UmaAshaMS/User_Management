import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../Components/OAuth'

function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const res = await fetch ('/api/auth/signup', {
        method : 'POST',
        headers : {
          'content-Type' : 'application/json',
        },
        body :JSON.stringify(formData)
    })
    const data  = await res.json();
    setLoading(false)
    if(data.success === false){
      setError(true);
      return;
    }
    navigate('/signin', { replace: true })
    }
    catch(error){
      setLoading(false)
      setError(true)
    }
    }
  return (
    <div className='p-3 max-w-lg mx-auto h-screen'>
      <h1 className='text-3xl text-center font-bold m-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input
          placeholder='Username :'
          type='text' id='username'
          className='bg-red-50 p-2.5 rounded-lg'
          onChange={handleChange} />
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
          <button className='cursor-pointer bg-red-200 p-3 w-60  text-center rounded-full hover:bg-red-300 transition'>{loading ? 'Loading...' : 'Sign Up'}</button>
        </div>
        <OAuth />
      </form>
      
      <div className='flex gap-2 mt-5'>
        <p>Already have an account ? </p>
        <Link to='/signin' >
          <span className='text-blue-500 flex'>Sign In </span>
        </Link>
      </div>
      <p className='text-red-600 mt-5'>{error && 'An error occured!!'}</p>

    </div>
  )
}

export default SignUp
