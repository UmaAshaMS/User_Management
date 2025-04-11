import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'; // FontAwesome
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, userUpdate, deleteUser, addUserStart, addUserFailure, addUserSuccess } from '../../redux/admin/adminSlice';


function AdminDashboard() {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.admin.users)

    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );



    console.log(users)
    const [editingUser, setEditingUser] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [addUsername, setAddUsername] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addPassword, setAddPassword] = useState('');



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/admin/admin/userDetails')
                const data = await res.json()
                dispatch(setUsers(data));
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        };
        fetchUsers();
    }, [dispatch])

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
                    dispatch(deleteUser(userId))
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

    const handleUpdate = (userId) => {
        try {
            const userToEdit = users.find(user => user._id === userId);
            setEditingUser(userToEdit);
            setNewUsername(userToEdit.username);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('username', newUsername);
            if (newProfilePic) {
                formData.append('profilePicture', newProfilePic);
            }

            const res = await fetch(`/api/admin/admin/updateUser/${editingUser._id}`, {
                method: 'PUT',
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                // update UI
                dispatch(userUpdate(data.updatedUser))
                setEditingUser(null);
                setNewUsername('')
                setNewProfilePic(null);
                Swal.fire('Updated!', 'User has been updated.', 'success');
            }
        } catch (error) {
            console.log('Admin update error:', error);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    const handleAddUser = async () => {
        dispatch(addUserStart());

        const userData = {
            username: addUsername,
            email: addEmail,
            password: addPassword
          };

        try {
            const res = await fetch('/api/admin/admin/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (data.success) {
                dispatch(addUserSuccess(data.newUser));
                setShowAddForm(false);
                console.log('add success')
                // Swal.fire('Success', 'User added successfully', 'success');
            } else {
                dispatch(addUserFailure(data.message || 'Add failed'));
                console.log('add failed', data.message)
                // Swal.fire('Error', data.message || 'Add failed', 'error');
            }
        } catch (error) {
            dispatch(addUserFailure(error.message));
            console.log('Error : ', error)
            // Swal.fire('Error', 'Something went wrong', 'error');
        }

    }

    console.log('Redux users:', users);

    return (
        <div className='flex flex-col justify-center items-center p-4 m-4'>
            <h1 className='text-xl font-bold'>Admin Dashboard </h1>
            <button onClick={() => setShowAddForm(true)} className='p-4 m-4 bg-slate-300 cursor-pointer hover:bg-slate-500 transition rounded-full'>
                Add User
            </button>
            <div>
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border p-2 m-4 w-80 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="bg-slate-300 px-4 py-2 rounded  hover:bg-slate-500 transition cursor-pointer"
                    onClick={() => setSearchQuery(searchTerm)}>
                    Search
                </button>
            </div>
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
                    <tbody className='text-center'>{users && users.length > 0 ?
                        (
                            filteredUsers.map((user, index) => (
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
                            ))
                        ) : (<tr>
                            <td>No users found</td>
                        </tr>)
                    }


                    </tbody>
                </table>
            </div>


            {/* // EDit modal */}
            {editingUser && (
                <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Edit User</h2>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="border p-2 w-full mb-3"
                            placeholder="New Username"
                        />
                        <input
                            type="file"
                            onChange={(e) => setNewProfilePic(e.target.files[0])}
                            className="border p-2 w-full mb-3"
                        />
                        <div className="flex justify-between">

                            <button
                                onClick={() => setEditingUser(null)}
                                className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer  hover:bg-gray-400">
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer  hover:bg-gray-400">
                                Save
                            </button>
                        </div>
                    </div>
                </div>

            )}

            {showAddForm && (
                <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-lg font-bold mb-4">Add New User</h2>
                        <input
                            type="text"
                            placeholder="Username"
                            className="border p-2 w-full mb-3"
                            value={addUsername}
                            onChange={(e) => setAddUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="border p-2 w-full mb-3"
                            value={addEmail}
                            onChange={(e) => setAddEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-2 w-full mb-3"
                            value={addPassword}
                            onChange={(e) => setAddPassword(e.target.value)}
                        />
                        
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-400 px-4 py-2 rounded-full hover:bg-gray-500">
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                className="bg-gray-400 px-4 py-2 rounded-full hover:bg-gray-500">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )


}

export default AdminDashboard
