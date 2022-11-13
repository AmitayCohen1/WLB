import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import wlbLogo from '../assets/wlbLogo.png'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => { 
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [nav, setNav] = useState(false)
  
    const handleNav = () => {
      setNav(!nav);
    };
    
    const handleLogout = () => { 
      logout()
    }
  
    return ( 
    <div className=' bg-black border-b border-stone-900'>
      <div className='flex justify-between items-center h-20 text-gray-200 relative font-Inter 
      px-4
      sm:px-8
      md:px-10
      lg:px-28 
      xl:px-64' 
      role="navigation"> 
        <Link to='/' className='flex items-center text-lg text-red font-JockeyOne'><img className='h-[75px] pr-2' src={wlbLogo} alt="wlb"/></Link>
        <div className='flex content-center'>
        <NavLink className={({isActive}) => isActive ? 'hover:bg-red px-4 ease-in duration-100 bg-red text-black font-medium text-xs md:text-base lg:text-lg py-3 rounded-full font-Inter' : 'hover:bg-red px-4 ease-in duration-100 bg-yellow text-black font-medium text-xs md:text-base lg:text-lg py-3 rounded-full font-Inter'} to='create'>Set A World Record</NavLink>      

        <div onClick={handleNav} className='cursor-pointer md:hidden text-white hover:text-red place-content-center grid pl-2'>
          { nav ? <AiOutlineClose size={20} 
          onMouseOver={({target})=>target.style.color="#F35D45"}
          /> : <AiOutlineMenu size={20}/>}
          </div>
            <div className='grid place-content-center'>
              <div className=' md:block hidden'>
              {!user && 
              <NavLink className={({isActive}) => 
              isActive ? "px-4 text-red" : 'hover:text-red px-4 text-white ease-in duration-100 '} 
              to='login' >Login
              </NavLink>}
              {user && <button className='hover:text-red text-white px-4 ease-in duration-100' onClick={handleLogout}>Logout</button>}
              </div>
            </div>
          </div>
        </div>

        <div className={nav? 'pb-4' :'md:hidden' }>
        <ul className={nav? 'bg-stone-900  rounded-lg mx-3 align-middle text-white text-left px-4 md:hidden' : 'bg-yellow-200 hidden'}>
        {/* <NavLink onClick={handleNav} className={({isActive}) => isActive ? "text-red" : 'text-white '} to='create'><li className='py-4 hover:text-red '>Set A World Record</li></NavLink> */}
        {!user && <NavLink onClick={handleNav} className={({isActive}) => isActive ? "text-red " : 'text-white hover:text-red'} to='login'><li className='py-4 hover:text-red'>Login</li></NavLink>}
        {/* {!user && <NavLink onClick={handleNav} className={({isActive}) => isActive ? "text-red" : 'text-white '} to='signup'><li className='py-4 hover:text-red'>Signup</li></NavLink>} */}
        {user && <button className='py-4 hover:text-red text-white' onClick={handleLogout}>Logout</button>}

        </ul>
      </div>
    </div>

    )  
  }
  
export default Navbar;