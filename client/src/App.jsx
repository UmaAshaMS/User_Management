import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import React from 'react'
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./Components/Header"
import PrivateRoute from "./Components/PrivateRoute"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminHeader from './Components/AdminHeader'
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminPrivateRoute from "./Components/AdminPrivateRoute"

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/admin/login' element={<AdminLogin />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}


function App() {

  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  )
}

export default App
