import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AddDepartment = () => {
  const [department,setDepartment]=useState({dep_name:'',description:''})

  const handleChange=(e)=> {
    const {name,value} =e.target;
    setDepartment({...department,[name]:value})
  }

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
     e.preventDefault()
     try {
      const response = await axios.post('http://localhost:4000/api/department/add',department,{
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
    <div>
      <div className="max-w-3xl mx-auto mt-20 bg-gray-100 p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Add Department</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="dep_name"
                className="text-sm font-medium">Department Name</label>
                <input onChange={handleChange} type="text" name="dep_name" placeholder="Department Name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"/>
            </div>
            <div className="mt-3">
                <label htmlFor="description"
                className="block text-sm font-medium">Description</label>
                <textarea onChange={handleChange} name="description"  placeholder="Description" 
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md" rows="4"></textarea>
            </div>
            <button type="submit" 
            className="w-full mt-6 bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded" >Add Department</button>
        </form>
      </div>
    </div>
  )
}

export default AddDepartment
