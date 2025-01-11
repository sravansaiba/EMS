import { Outlet } from "react-router-dom"
import Sidebar from "../components/EmployeeDashboard/Sidebar"
import Navbar from "../components/dashboard/Navbar"
import SummaryCard from "../components/EmployeeDashboard/Summary"


const EmployeeDashboard = () => {
  
  return (
    <div className="flex">
    <Sidebar/>
    <div className="flex-1 ml-64 bg-white">
        <Navbar/>
        {/* <SummaryCard/> */}
        <Outlet/>
    </div>
    </div>
  )
}

export default EmployeeDashboard
