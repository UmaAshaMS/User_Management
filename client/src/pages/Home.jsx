import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import useVerifyUser from '../hooks/useVerifyUser.js'
// import {increment, decrement} from '../redux/user/userSlice.js'


function Home() {
  useVerifyUser();

  // const dispatch = useDispatch()
  const { currentUser} = useSelector(state => state.user)

  return (
    <div>
      <h1 className='text-3xl text-center m-4 p-4 font-bold'>{currentUser ? `Welcome ${currentUser.username}`:'Welcome to Home Page'}</h1>
     
    </div>
  )
}

export default Home
