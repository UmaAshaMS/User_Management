import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLoginFailure, adminLoginStart, adminLoginSuccess } from '../../redux/admin/adminSlice';

function AdminLogin() {
    const [formData, setformData] = useState({});
    const {loading, error} =useSelector((state) => state.admin)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(adminLoginStart())
            const res = await fetch('/api/admin/admin/login', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data  = await res.json();

            if(data.success === false){
                dispatch(adminLoginFailure(data.message))
                console.log("Admin Login NOT successful");
                return;
            }
            dispatch(adminLoginSuccess(data))
            console.log("Login success! isAuthenticated should now be true.")
            navigate('/admin/dashboard', { replace: true })
        }
        catch (error) {
            dispatch(adminLoginFailure(error.message))
        }
    }
    return (
        <div className=' p-4 max-w-lg mx-auto h-screen'>
            <h1 className='text-3xl text-center font-bold m-7'>Admin login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='email'
                    placeholder='Email ID :'
                    id='email'
                    className='bg-slate-200 p-2.5 rounded-lg'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='Password :'
                    id='password'
                    className='bg-slate-200 p-2.5 rounded-lg'
                    onChange={handleChange}
                />

                <div className='flex justify-center items-center'>
                    <button className='cursor-pointer w-60 bg-slate-400 p-3 text-center rounded-full hover:bg-slate-700 transition'>
                        Login
                    </button>
                </div>
            </form>
            <p className='text-red-500'>{error ? error : ''}</p>
        </div>
    )
}

export default AdminLogin
