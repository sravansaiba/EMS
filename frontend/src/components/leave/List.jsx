 import { Link } from "react-router-dom"
 import { useEffect, useState } from "react"
 import axios from 'axios'
import { useAuth } from "../../context/authContext"
 
 const LeaveList = () => {
  const {user}=useAuth()
  const [loading,setloading]=useState(false)
  const [leaves,setLeaves]=useState([])
  const [filteredLeaves,setFilteredLeaves]=useState([])
  let sno=1;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setloading(true);
        const response = await axios.get(`http://localhost:4000/api/leave/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setLeaves(response.data.leaves);
          setFilteredLeaves(response.data.leaves);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      } finally {
        setloading(false);
      }
    };

    fetchLeaves();
  }, []);

  // console.log(leaves);
  

  const filterLeaves = (e) => {
    const records = leaves.filter((leave) =>
      leave.status.toLocaleLowerCase().includes(e.toLocaleLowerCase())
    );
    setFilteredLeaves(records);
  };

   return (
    <div className="p-5">
    <div className="text-center">
      <h3 className="text-2xl font-bold">Manage Leaves</h3>
    </div>
    <div className="flex justify-between items-center">
      <input type="text"  placeholder="Search By Status" className="px-4 py-0.5 border"/>
      <Link to="/employee-dashboard/add-leave" className="px-4 py-1 bg-purple-500 text-white rounded-lg">Add New Leave</Link>
    </div>

    <table className="w-full text-sm text-left text-gray-500 mt-5">
           <thead className="text-xs text-black uppercase bg-gray-50 border border-black">
            <tr key={""}>
                 <th className="px-6 py-3">SNO</th>
                 <th className="px-6 py-3">Leave Type</th>
                 <th className="px-6 py-3">From</th>
                 <th className="px-6 py-3">To</th>
                 <th className="px-6 py-3">Description</th>
                 <th className="px-6 py-3">Applied Date</th>
                 <th className="px-6 py-3">Status</th>
            </tr>
           </thead>
           <tbody>
           
            {filterLeaves.length>0?

            (filteredLeaves.map((leave)=>(
                <tr
                key={leave._id}
                className="bg-slate-50 border border-black">
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{leave.leaveType}</td>
                    <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{leave.reason}</td>
                    <td className="px-6 py-3">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{leave.status}</td>

                </tr>
            ))
          ):<div>No Leaves present</div>}

           </tbody>
         </table>

  </div>
   )
 }
 
 export default LeaveList  
 