import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt,FaUsers} from 'react-icons/fa'

const AdminSidebar = () => {
  return (
    <div className='bg-white shadow-md text-black h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-purple-500 h-14 flex justify-center'>
            <h3 className='text-3xl text-center font-lex mt-2'>EMS</h3>
        </div>  
        <div className='px-4'>
            <NavLink to="/admin-dashboard"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`} end>
            <FaTachometerAlt/>
            <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin-dashboard/employees"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            
            <FaUsers/>
            <span>Employee</span>
            </NavLink>

            <NavLink to="/admin-dashboard/departments"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            <FaBuilding/>
            <span>Departments</span>
            </NavLink>

            <NavLink to="/admin-dashboard/leaves"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            <FaCalendarAlt/>
            <span>Leaves</span>
            </NavLink>

            <NavLink to="/admin-dashboard/salary/add"
            className={({isActive}) => `${isActive?"bg-purple-100":""} flex items-center space-x-4  py-3 px-4 rounded`}>
            <FaMoneyBillWave/>
            <span>Salary</span>
            </NavLink>

            <NavLink to="/admin-dashboard"
            className="flex items-center space-x-4 block py-2.5 px-4 rounded ">
            <FaCogs/>
            <span>Setting</span>
            </NavLink>
        </div>
      
    </div>
  )
}

export default AdminSidebar
