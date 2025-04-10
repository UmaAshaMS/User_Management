import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'; // FontAwesome
import Swal from 'sweetalert2'


function AdminDashboard() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/admin/admin/userDetails')
                const data = await res.json()
                setUsers(data)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        };
        fetchUsers();
    }, [])

    // console.log('Users',users)

    const handleDelete = async (userId) => {
        const confirm = Swal.fire({
            title: 'Delete user ?',
            text: 'Do you  want to delte user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })
        if ((await confirm).isConfirmed) {
            try {
                const res = await fetch(`/api/admin/admin/deleteUser/${userId}`, {
                    method: 'DELETE',
                });

                const data = await res.json();

                if (data.success) {
                    setUsers(prev => prev.filter(user => user._id !== userId))
                }
            }
            catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error in User deletion.',
                    icon: 'error',
                });
                console.log('Error in deleting user', error)
            }
        }
    }

    const handleUpdate = async(userId) => {
        try{

        }
        catch(error){
            console.log(error)
        }

    }


    return (
        <div className='flex flex-col justify-center items-center p-4 m-4'>
            <h1 className='text-xl font-bold'>Admin Dashboard </h1>
            <button className='p-4 m-4 bg-slate-300'>Add User</button>
            <div>
                <table className='table-auto border border-collapse border-gray w-full'>
                    <thead>
                        <tr>
                            <th className='border border-gray-300 px-4 py-4'>Sl.No</th>
                            <th className='border border-gray-300 px-4 py-4'>User ID</th>
                            <th className='border border-gray-300 px-4 py-4'>User Name</th>
                            <th className='border border-gray-300 px-4 py-4'>Email ID</th>
                            <th className='border border-gray-300 px-4 py-4'>Joined On</th>
                            <th className='border border-gray-300 px-4 py-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td className='border border-gray-300 px-4 py-2'>{index + 1}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user._id.slice(-4)}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.username}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.email}</td>
                                <td className='border border-gray-300 px-4 py-2'>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    <button onClick={() => handleUpdate(user._id)} className='cursor-pointer'><FaEdit /></button>
                                    <button onClick={() => handleDelete(user._id)} className='cursor-pointer'><FaTrash /></button>
                                </td>
                            </tr>
                        )

                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard
