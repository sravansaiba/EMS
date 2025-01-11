import { useState } from "react"
import axios from "axios"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"


const Login = () => {

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const {login}=useAuth()
    const navigate =useNavigate()


    const handleSubmit= async (e)=>{
      e.preventDefault()

      try {
        const response =await axios.post("http://localhost:4000/api/auth/login",{email,password})
        
        if(response.data.success){
          login(response.data.user)
          localStorage.setItem("token",response.data.token)
          if (response.data.user.role === "admin"){
            navigate("/admin-dashboard")
          }else{
            navigate("/employee-dashboard")
          }
        }
        
        console.log(response);
        
        
      } catch (error) {
        if(error.response && !error.response.data.success){
          setError(error.response.data.error)
        }else{
          setError("server error")
        }
        console.log(error);
        
        
      }
    }

//for backgound image style={{backgroundImage:"url(/bg1.jpeg)",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}

  return (
    <div
    className="flex flex-col items-center h-screen  w-auto justify-center bg-gradient-to-b from-purple-700 from-50% to-gray-100 to-50% space-y-6 ">
      <h2 className="font-lex text-3xl text-white">Employee Management System</h2>
     <div className="border shadow p-6 w-80 bg-white rounded-md">
     <h2 className="text-2xl font-mono mb-4">Login</h2>
     {error && <p className="text-red-500 mb-2 ml-14">{error}</p>}
     <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input className="w-full px-3 py-2 border"
            type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input className="w-full px-3 py-2 border"
            type="password" placeholder="********" onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center"><input type="checkbox" className="form-checkbox"/>
            <span className="ml-2 text-gray-700">Remember me</span></label>
            <a href="#" className="text-purple-400">Forgot password?</a>
        </div>
        <button type="submit" className="w-full bg-purple-700 text-white py-2">Login</button>
      </form>
     </div>
    </div>
  )
}

export default Login
