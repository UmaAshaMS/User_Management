import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { signOut, updateUser } from '../redux/user/userSlice'


function Profile() {

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)

  
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${currentUser._id}`);
        const data = await res.json();
        dispatch(updateUser(data.user)); 
        console.log("updateduser",data)
      } catch (err) {
        console.log('Failed to fetch user data:', err);
      }
    };
  
    if (currentUser) {
      getUserDetails();
    }
  }, []);
  
  const handleSignout = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut())
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username)

      if (profilePicture) {
        formData.append('profilePicture', profilePicture)
      }

      console.log('dta passed from update : ', formData)
      const res = await fetch(`/api/user/updateUser/${currentUser._id}`, {
        method: 'PUT',

        body: formData
      });

      const data = await res.json()
      console.log(data)
      if (data.success) {
        dispatch(updateUser(data.updatedUser));
        setShowModal(false);
      

      }
    }
    catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold text-center m-4 p-4'>My Profile</h1>

      <img src={currentUser.profilePicture} alt='No image' className='rounded-full self-center w-24 h-24 ' />
      <br></br>
      <p className='font-bold'>{currentUser.username}</p>

      <button onClick={handleSignout} className='w-32 bg-red-200 p-4 m -4 gap-2 rounded-full cursor-pointer hover:bg-red-300 transition'> Sign Out
      </button>
      <div>
        {/* <button className='w-32 text-red-600 cursor-pointer hover:text-black'>Delete Account</button> */}
        <button onClick={() => { setUsername(currentUser.username); setShowModal(true) }} className='w-32 text-blue-700 cursor-pointer hover:text-black'>Update Profile</button>
      </div>

      {/* Modal for Editing user profile*/}


      {showModal && (
        <div className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-md max-w-sm w-full'>
            <h2 className='text-xl font-semibold mb-4'>Update Profile</h2>
            <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
              <input
                type='text'
                value={username}
                placeholder='New username : '
                onChange={(e) => setUsername(e.target.value)}
                className='border rounded p-2'
              />

              <input
                type='file'
                placeholder='New Profile Picture : '
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className='border rounded p-2'
              />

              <div className='flex justify-end gap-3'>
                <button type='button' onClick={() => setShowModal(false)} className='rounded-full px-4 py-2 bg-gray-300 hover:bg-gray-400'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-red-300 hover:bg-red-400 rounded-full'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  )
}

export default Profile
