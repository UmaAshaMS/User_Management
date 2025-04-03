import { BrowserRouter ,Routes, Route} from "react-router-dom"
import React from 'react'
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./Components/Header"

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* Header for all pages */}
      <Header />
      <Routes>
       
        <Route path = '/' element ={<Home />} />
        <Route path = '/about' element ={<About />} />
        <Route path = '/signIn' element ={<SignIn />} />
        <Route path = '/signUp' element ={<SignUp />} />
        <Route path = '/profile' element ={<Profile />} />

      </Routes>
       
      </BrowserRouter>
      
    </div>
  )
}

export default App
