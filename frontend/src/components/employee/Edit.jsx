import {fetchdepartments} from "../../utils/EmployeeHelper";
import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
const [employee,setEmployee]=useState({
    name:'',
    maritalStatus:'',
    designation:'',
    salary:0,
    department:''
} )
const [formData,setFormData]=useState([])
const [departments,setDepartments]=useState(null)
const navigate=useNavigate()
const {id}=useParams()


useEffect(()=>{
    const getDepartments =async ()=>{
    const departments= await fetchdepartments()
    setDepartments(departments)
    }
    getDepartments()

},[])



useEffect(()=>{
    const fetchEmployee=async()=>{
        try {
          
          const response =await axios.get(`http://localhost:4000/api/employee/${id}`,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          })
   
   
          console.log(response.data);
          
          if (response.data.success){
           const employee=response.data.employee
            setEmployee((prev)=>({...prev,name:employee.userId.name,maritalStatus:employee.maritalStatus,designation:employee.designation,salary:employee.salary,department:employee.department}))
          }
            
        } catch (error) {
          console.log(error);
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
          
        }
       }
      
      fetchEmployee();
},[]);

const handleChange= (e) =>{
    const {name,value}= e.target;

    
        setEmployee((prevData)=>({...prevData,[name]:value}))
    
}


const handleSubmit = async(e)=>{
    e.preventDefault()
   

    try {
        const response =await axios.put(
            `http://localhost:4000/api/employee/${id}`,employee,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
     
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
        departments && employee ? (
            <div className="max-w-4xl mx-auto mt-10 bg-gray-100 p-8 rounded-md shadow-md">
       <h2 className="text-2xl font-semibold mb-6">Edit Employee</h2>
       <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
   
              {/* Name  */}
              <div>
              <label className="block text-sm font-medium text-gray-700">
                  Name
              </label>
              <input type="text"
              value={employee.name}
              onChange={handleChange}
              name="name" placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required/>
              </div>
   
           
   
               {/* Marital Status  */}
               <div>
               <label className="block text-sm font-medium text-gray-700">
                  Marital Status
              </label>
              <select name="maritalStatus" 
              value={employee.maritalStatus}
              onChange={handleChange}
              placeholder="Marital Status"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                  <option value="">Select Status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
              </select>
               </div> 
   
               
               {/* Designation  */}
               <div>
               <label className="block text-sm font-medium text-gray-700">
                  Designation
              </label>
              <input 
              onChange={handleChange}
              value={employee.designation}
              type="text" name="designation" placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gary-300 rounded-md"
              required />
               </div>
   
   
            
   
               {/* Salary  */}
               <div>
                  <label className="block text-sm font-medium text-gray-700">Salary</label>
                  <input 
              onChange={handleChange}
              value={employee.salary}
              type="number" name="salary" placeholder="Salary" 
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required></input>
               </div>
   
   
           {/* Department  */}
               <div className="col-span-2">
               <label className="block text-sm font-medium text-gray-700">
               Department
               </label>
               <select
              onChange={handleChange}
              value={employee.department}
              name="department" className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
                  <option value="">Select Department</option>
                  {departments.map(dep=>(
                      <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))}
   
               </select>
               </div>
               
               <button type="submit" 
               className="md:w-[55vw] mt-6 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-md">
                  Edit Employee
               </button>
            
          </div>
       </form>
      </div>
       ):<div>loading...</div>
    }</>
  )
}

export default Edit
