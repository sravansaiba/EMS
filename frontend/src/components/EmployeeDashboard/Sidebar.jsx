import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaTachometerAlt,FaUser} from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Sidebar = () => {
    const {user}=useAuth()
  return (
    <div className='bg-white shadow-md text-black h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-purple-500 h-14 flex justify-center'>
            <h3 className='text-3xl text-center font-lex mt-2'>Employee MS</h3>
        </div>  
        <div className='px-4'>
            <NavLink to="/employee-dashboard"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`} end>
            <FaTachometerAlt/>
            <span>Dashboard</span>
            </NavLink>

            <NavLink to={`/employee-dashboard/profile/${user._id}`}
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            
            <FaUser/>
            <span>My Profile</span>
            </NavLink>

            <NavLink to="/employee-dashboard/leaves"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            <FaBuilding/>
            <span>Leaves</span>
            </NavLink>

            <NavLink to={`/employee-dashboard/salary/${user._id}`}
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            <FaCalendarAlt/>
            <span>Salary</span>
            </NavLink>

         

            <NavLink to="/employee-dashboard/setting"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            <FaCogs/>
            <span>Settings</span>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar

