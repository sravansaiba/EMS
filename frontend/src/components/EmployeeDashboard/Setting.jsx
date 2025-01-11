import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { useState } from "react"
import axios from "axios"


const Setting = () => {
    const navigate=useNavigate()
    const {user}=useAuth()
    const [setting,setSetting]=useState({
        userId:user._id,
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    });
    const [error,setError]=useState(null)

    const handleChange=(e)=>{
        const {name,value}=e.target
        setSetting({...setting,[name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword){
            setError("Password not matched")
        }else{
            try {
                const response =await axios.put("http://localhost:4000/api/setting/change-password",setting,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,},});
                if(response.data.success){
                    navigate("/employee-dashboard")
                    setError("")
                }
            } catch (error) {
                if(error.response && !error.response.data.success){
                    setError(error.response.data.error)
                }
                
            }
        }
    }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-100 p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <p className="text-red-500">{error}</p>
        <form onSubmit={handleSubmit}> 
         {/* Department Name */}
         <div className="mb-4">
            <label className="text-sm font-medium text-black">Old Password</label>
            <input type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange} 
            className="mt-1 w-full p-2 border border-black rounded-md"
            required/>
         </div>

         <div className="mb-4">
            <label className="text-sm font-medium text-black">New Password</label>
            <input type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange} 
            className="mt-1 w-full p-2 border border-black rounded-md"
            required/>
         </div>

         <div>
            <label className="text-sm font-medium text-black">Confirm Password</label>
            <input type="password"
            name="confirmPassword"
            placeholder="Change Password"
            onChange={handleChange} 
            className="mt-1 w-full p-2 border border-black rounded-md"
            required/>
         </div>

         <button type="submit" className="w-full mt-6 bg-purple-500 hover:bg-purple-400 text-black font-bold py-2 px-4 rounded-md"> Change Password</button>

        </form>
      
    </div>
  )
}

export default Setting
