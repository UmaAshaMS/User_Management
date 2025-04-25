import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

function Header() {
  const { currentUser } = useSelector(state => state.user)


  // console.log('---------------', currentUser)


  return (
    <div className='bg-red-100'>
      <div className='p-4 flex justify-between items-centre'>
        <Link to='/'>
          <h1 className='font-bold items-centre '>Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <li>
          <Link to='/' >
            Home
          </Link>
          </li>
          
          <li>
          <Link to='/about'>
            About
          </Link>
          </li>
          
          <li>
          <Link to={currentUser ? '/profile' : '/signup'}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture} alt='No profile' className="w-8 h-8 rounded-full object-cover border" referrerPolicy="no-referrer" />
            ) : (
              <span>SignIn</span>)}


          </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
