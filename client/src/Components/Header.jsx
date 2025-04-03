import { Link } from "react-router-dom"
function Header() {
  return (
    <div className='bg-red-200'>
      <div className='p-4 flex justify-between items-centre'>
        <Link to= '/'>
            <h1 className='font-bold items-centre'>Auth App</h1>
        </Link>
      <ul className="flex gap-4">
        <Link to = '/' >
            <li>Home</li>
        </Link>
        <Link to = '/about'>
            <li>About</li>
        </Link>
        <Link to = '/profile'>
            <li>Profile</li>
        </Link>
      </ul>
      </div>
    </div>
  )
}

export default Header
