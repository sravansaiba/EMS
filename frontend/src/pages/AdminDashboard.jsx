
import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/dashboard/AdminSidebar"
import Navbar from "../components/dashboard/Navbar"
import { useAuth } from "../context/authContext"

const AdminDashboard = () => {

  const {user} =useAuth()


  
  return (
    <div className="flex">
    <AdminSidebar/>
    <div className="flex-1 ml-64 bg-white">
        <Navbar/>
        <Outlet/>

    </div>
    </div>
  )
}

export default AdminDashboard
