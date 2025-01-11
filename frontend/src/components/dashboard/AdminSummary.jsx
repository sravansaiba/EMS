import SummaryCard from "./SummaryCard"
import {FaBuilding, FaMoneyBillWave, FaUsers} from 'react-icons/fa'

const AdminSummary = () => {
  return (
    <div className="p-6" >
      <h3 className="text-2xl font-semibold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<FaUsers/>} text={"Total Employees"} num={13} color={"bg-green-500"}/>
        <SummaryCard icon={<FaBuilding/>} text={"Total Departments"} num={5} color={"bg-red-500"}/>
        <SummaryCard icon={<FaMoneyBillWave/>} text={"Monthly Pay"} num={5} color={"bg-pink-500"}/>
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2xl font-semibold">Leave Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SummaryCard icon={<FaBuilding/>} text={"Leave Applied"} num={5} color={"bg-teal-500"}/>
        <SummaryCard icon={<FaBuilding/>} text={"Leave Approved"} num={2} color={"bg-purple-500"}/>
        <SummaryCard icon={<FaBuilding/>} text={"Leave Pending"} num={4} color={"bg-yellow-500"}/>
        <SummaryCard icon={<FaBuilding/>} text={"Leave Rejected"} num={1} color={"bg-orange-500"}/>
        </div>

      </div>
    </div>
  )
}

export default AdminSummary
