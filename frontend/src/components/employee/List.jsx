import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper"

const List = () => {

  
  const [employees,setEmployees] = useState([])
  const [loading,setloading]=useState(false)
  const [filteredEmployee,setFilteredEmployee]=useState([])
   
  // const onDepartmentDelete = async(id) =>{
  //   const data = departments.filter(dep=>dep._id !== id)
  //   setDepartments(data)
  // }

  useEffect(()=>{
   const fetchEmployees=async()=>{
    try {
      setloading(true)
      const response =await axios.get("http://localhost:4000/api/employee",{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success){
        let sno=1;
        const data =await response.data.employees.map((emp)=>(
          {
            _id:emp._id,
            sno:sno++,
            dep_name:emp.department.dep_name,
            name:emp.userId.name,
            dob:new Date(emp.dob).toLocaleDateString(),
            profileImage:<img width={40} className="rounded-full" src={`http://localhost:4000/${emp.userId.profileImage}`} alt="profileimg"/>,
            action:(<EmployeeButtons Id={emp._id}/>)

          }
        ))

     setEmployees(data)  
     setFilteredEmployee(data)

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
  
  fetchEmployees();

  },[])


  const handleFilter =(e)=>{
    const records=employees.filter((emp)=>(emp.name.toLowerCase().includes(e.target.value.toLowerCase())))

    setFilteredEmployee(records)
  }


  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input type="text" onChange={handleFilter} placeholder="Search By Emp Name" className="px-4 py-0.5 border"/>
        <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-purple-500 text-white rounded-lg">Add New Employee</Link>
      </div>

     <div>
      <DataTable  columns={columns} data={filteredEmployee} pagination/>
     </div>

    </div>
  )
}

export default List
