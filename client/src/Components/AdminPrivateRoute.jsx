import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function AdminPrivateRoute() {
    const { isAuthenticated } = useSelector((state) => state.admin);
    return isAuthenticated ? <Outlet /> : <Navigate to='/admin/login' />
}

export default AdminPrivateRoute