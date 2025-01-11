import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { fetchdepartments, getEmployees } from "../../utils/EmployeeHelper";


const AddSalary = () => {
const [salary,setSalary]=useState({
    employeeId:'',
    basicSalary:0,
    allowances:0,
    deductions:0,
    payDate:null,
} )


const [departments,setDepartments]=useState([])
const [employees,setEmployees]=useState([])
const navigate=useNavigate()





useEffect(()=>{
    const getDepartments =async ()=>{
    const departments= await fetchdepartments()
    setDepartments(departments)
    }
    getDepartments()

},[])


const handleDepartment=async(e)=>{
  const emps=await getEmployees(e.target.value)
  setEmployees(emps)
}


console.log("this are departments:",departments);
console.log("this are employees:",employees);




const handleChange= (e) =>{
    const {name,value}= e.target;

    
        setSalary((prevData)=>({...prevData,[name]:value}))
    
}


const handleSubmit = async(e)=>{
    e.preventDefault()
   

    try {
        const response =await axios.post(
            "http://localhost:4000/api/salary/add",salary,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
     
            if (response.data.success){
                navigate("/admin-dashboard/employees")
            }

    } catch (error) {
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }
        
    }
}


  return (
    <>{
        departments ? (
            <div className="max-w-4xl mx-auto mt-10 bg-gray-100 p-8 rounded-md shadow-md">
       <h2 className="text-2xl font-semibold mb-6">Add New Salary</h2>
       <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


             {/* Department  */}
             <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700">
               Department
               </label>
               <select
              onChange={handleDepartment}
              value={salary.department}
              name="department" className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                  <option value="">Select Department</option>
                  {departments.map(dep=>(
                      <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))}
   
               </select>
               </div>
   
            
                 {/* Employees  */}
             <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700">
               Employee
               </label>
               <select
              onChange={handleChange}
              name="employeeId" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                  <option value="">Select Employee</option>
                  {employees.map(emp=>(
                      <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                  ))}
   
               </select>
               </div>

   
               
               {/* Basic Salary  */}
               <div>
               <label className="block text-sm font-medium text-gray-700">
               Basic Salary
              </label>
              <input 
              onChange={handleChange}
              type="number" 
              name="basicSalary" placeholder="Basic Salary"
              className="mt-1 p-2 block w-full border border-gary-300 rounded-md"
              required />
               </div>
   
   
            
   
               {/* Salary  */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Allowances</label>
                  <input 
              onChange={handleChange}
              type="number" name="allowances" placeholder="Allowances" 
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required></input>
               </div>


               {/* deductions  */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Deductions</label>
                  <input 
              onChange={handleChange}
              type="number" name="deductions" placeholder="Deductions" 
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required></input>
               </div>
               

               {/* pay Date */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                  <input 
              onChange={handleChange}
              type="date" name="payDate"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required></input>
               </div>
   
   
          
               
               <button type="submit" 
               className="md:w-[55vw] mt-6 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-md">
                  Add Salary
               </button>
            
          </div>
       </form>
      </div>
       ):<div>loading...</div>
    }</>
  )
}

export default AddSalary


