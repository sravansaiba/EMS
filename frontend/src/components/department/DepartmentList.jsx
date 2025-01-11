import {Link} from "react-router-dom"
import DataTable from 'react-data-table-component'
import DepartmentButtons, { columns } from "../../utils/DepartmentHelper"
import { useEffect, useState } from "react"
import axios from "axios"

const DepartmentList = () => {

  const [departments,setDepartments] = useState([])
  const [loading,setloading]=useState(false)
  const [filteredDepartments,setFilteredDepartments]=useState([])
   
  const onDepartmentDelete = async(id) =>{
    const data = departments.filter(dep=>dep._id !== id)
    setDepartments(data)
  }

  useEffect(()=>{
   const fetchdepartments=async()=>{
    try {
      setloading(true)
      const response =await axios.get("http://localhost:4000/api/department",{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success){
        let sno=1;
        const data =await response.data.departments.map((dep)=>(
          {
            _id:dep._id,
            sno:sno++,
            dep_name:dep.dep_name ,
            action:<DepartmentButtons _id={dep._id} onDepDelete={onDepartmentDelete}/>
          }
        ))
     setDepartments(data)
     setFilteredDepartments(data)

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
  
  fetchdepartments();

  },[])

  const filterDepartments = (e) =>{
    const records=departments.filter((dep)=>
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  return (
    <>{loading?<div>Loading ... </div>:<div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center">
        <input type="text" placeholder="Search By Dep Name" className="px-4 py-0.5 border"
        onChange={filterDepartments}/>
        <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-purple-500 text-white rounded-lg">Add New Department</Link>
      </div>

      <div className="mt-5">
       <DataTable columns={columns} data={filteredDepartments} pagination/>
      </div>
    </div>}
    </>
  )
}

export default DepartmentList
