import { useState } from "react"
import { useAuth } from "../../context/authContext";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const AddLeave = () => {

    const {user}=useAuth()
    const [leave,setLeave]=useState({

       userId:user._id,

    })
    const navigate=useNavigate()

    const handleChange =(e)=>{
      const {name,value}=e.target 
      setLeave((prev)=>({...prev,[name]:value}))
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(
              "http://localhost:4000/api/leave/add",leave,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
    
            console.log(response.data);
    
            if (response.data.success) {
              navigate("/employee-dashboard/leaves")
            }
          } catch (error) {
            console.log(error);
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
            }
          }

    }


  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gray-100 p-8 rounded-md shadow-md ">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
            <div>
                <label className="block text-sm font-medium text-black">Leave Type</label>
                <select name="leaveType"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-black rounded-md">
                 <option value="">Select Type</option>
                 <option value="Sick Leave">Sick Leave</option>
                 <option value="Casual Leave">Casual Leave</option>
                 <option value="Annual Leave">Annual Leave</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* form date */} 
                <div>
                    <label className="block text-sm font-medium text-black">
                        From Date
                    </label>
                    <input type="date" name="startDate" onChange={handleChange}
                    className="mt-1 p-2 w-full border border-black rounded-md"
                    required />
                </div>
                  {/* to date */} 
                  <div>
                    <label className="block text-sm font-medium text-black">
                        To Date
                    </label>
                    <input type="date" name="endDate" onChange={handleChange}
                    className="mt-1 p-2 w-full border border-black rounded-md"
                    required />
                </div>
            </div>

            {/* description */}
            <div>
               <label className="block text-sm font-medium text-black">Description</label>
               <textarea name="reason" placeholder="Reason for requesting Leave.." onChange={handleChange}
               className="w-full border border-black rounded-md mt-2 pl-4 pt-1 ">

               </textarea>
            </div>
        </div>
        <button type="submit" 
        className="w-full mt-6 bg-purple-500 hover:bg-purple-400 font-bold py-2 px-4 rounded-md">Request Leave</button>
      </form>
    </div>
  )
}

export default AddLeave
