import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { columns } from "../../utils/DepartmentHelper"
import axios from 'axios'


const EditDepartment = () => {
    
    const {id} = useParams()
    const [department,setDepartment] = useState([])
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchdepartments=async()=>{
         try {
           setLoading(true)
           const response =await axios.get(`http://localhost:4000/api/department/${id}`,{
             headers:{
               "Authorization":`Bearer ${localStorage.getItem('token')}`
             }
           })
           if (response.data.success){
            
             setDepartment(response.data.department)
           }
             
         } catch (error) {
           console.log(error);
           if(error.response && !error.response.data.success){
             alert(error.response.data.error)
           }
           
         }finally{
           setLoading(false)
         }
        }
       
       fetchdepartments();
     
       },[])


       const handleChange=(e)=> {
        const {name,value} =e.target;
        setDepartment({...department,[name]:value})
      }


      const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
         const response = await axios.put(`http://localhost:4000/api/department/${id}`,department,{
           headers:{
             "Authorization":`Bearer ${localStorage.getItem('token')}`
           }
         })
   
         if(response.data.success){
            navigate("/admin-dashboard/departments")
         }
       
        } catch (error) {
         if(error.response && !error.response.data.success){
           alert(error.response.data.error)
         }
        }
      }

  return (
    
      <>
      {loading?<div>Loading ... </div>:
       <div className="max-w-3xl mx-auto mt-20 bg-gray-100 p-8 rounded-md shadow-md w-96">
       <h2 className="text-2xl font-semibold mb-6">Edit Department</h2>
       <form onSubmit={handleSubmit}>
           <div>
               <label htmlFor="dep_name"
               className="text-sm font-medium">Department Name</label>
               <input onChange={handleChange}
               value={department.dep_name} type="text" name="dep_name" placeholder="Department Name"
               className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
           </div>
           <div className="mt-3">
               <label htmlFor="description"
               className="block text-sm font-medium">Description</label>
               <textarea onChange={handleChange} 
               value={department.description} name="description"  placeholder="Description" 
               className="mt-1 p-2 block w-full border border-gray-300 rounded-md" rows="4"></textarea>
           </div>
           <button type="submit" 
           className="w-full mt-6 bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded" >Edit Department</button>
       </form>
     </div>}
      </>

  )
}

export default EditDepartment
