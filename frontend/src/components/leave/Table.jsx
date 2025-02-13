import { Link } from "react-router-dom"
import axios from "axios"
import { LeaveButtons } from "../../utils/LeaveHelper"
import { useEffect,useState } from "react"
import DataTable from "react-data-table-component"
import { columns } from "../../utils/LeaveHelper"

const Table = () => {

    const [loading,setloading]=useState(false)
    const [leaves,setLeaves]=useState([])


  const fetchLeaves =async()=>{

    try {
      setloading(true)
      const response =await axios.get("http://localhost:4000/api/leave",{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success){
        let sno=1;
        const data =await response.data.leaves.map((leave)=>(
          {
            _id:leave._id,
            sno:sno++,
            employeeId:leave.employeeId.employeeId,
            name:leave.employeeId.userId.name,
            leaveType:leave.leaveType,
            department:leave.employeeId.department.dep_name,
            days:new Date(leave.endDate).getDate()-new Date(leave.startDate).getDate(),
            status:leave.status,
            action:(<LeaveButtons Id={leave._id}/>)

          }
        ))

     setLeaves(data)  
    //  setFilteredEmployee(data)

      }
        
    } catch (error) {
      console.log(error);
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
      
    }finally{
      setloading(false)
    }

  }

  useEffect(()=>{
    fetchLeaves()
  },[])

  return (
    <div className="p-6">
      <div className="text-center">
      <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
    <div className="flex justify-between items-center">
      <input type="text"  placeholder="Search By Emp ID" className="px-4 py-0.5 border"/>
      <div className=" space-x-3 mr-5">      
      <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">Pending</button>
      <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">Approved</button>
      <button className="px-4 py-1 bg-purple-500 text-white rounded-lg">Rejected</button>
      </div>
    </div>
    <div className="mt-3">
    <DataTable columns={columns} data={leaves} pagination/>
    </div>
    
    </div>
  )
}

export default Table
