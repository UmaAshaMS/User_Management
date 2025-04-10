import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../redux/admin/adminSlice';

function AdminHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.admin)

    console.log('Admin state:', useSelector((state) => state.admin));

    const handleLogout = async() => {
        await fetch('/api/admin/logout')
        dispatch(adminLogout());
        navigate('/admin/login')
    }

    return (
        
        <div className='bg-slate-500 text-white p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Admin Panel</h1>
                {isAuthenticated && (
                    <button onClick={handleLogout} className='bg-white text-slate-800 px-4 py-2 rounded hover:bg-gray-200 transition duration-200'>
                        Sign Out
                    </button>
                )}
            </div>
        </div>
    )
}

export default AdminHeader
