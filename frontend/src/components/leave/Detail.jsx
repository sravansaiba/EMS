

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Detail = () => {
  const [leave, setLeave] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, []);

  const changeStatus=async(id,status)=>{
     
  }

  return (
    <>
      {leave ? (
        <div className="max-w-4xl mx-auto mt-10 bg-gray-100 p-6 md:p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={`http://localhost:4000/${leave.employeeId.userId.profileImage}`}
                alt="Employee"
                className="rounded-full border-4 border-gray-300 w-40 h-40 md:w-52 md:h-52 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">Name:</p>
                <p className="font-medium text-gray-600">
                  {leave.employeeId.userId.name}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                  Employee ID:
                </p>
                <p className="font-medium text-gray-600">
                  {leave.employeeId.employeeId}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                  Leave Type:
                </p>
                <p className="font-medium text-gray-600">
                  {leave.leaveType}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">Reason:</p>
                <p className="font-medium text-gray-600">{leave.reason}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                  Department:
                </p>
                <p className="font-medium text-gray-600">
                  {leave.employeeId.department.dep_name}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                    Start Date:
                </p>
                <p className="font-medium text-gray-600">
                  {new Date(leave.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                    End Date:
                </p>
                <p className="font-medium text-gray-600">
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                  {leave.status === "Pending" ? "Action:":"Status:"}
                </p>
                {leave.status ==="Pending"?(
                  <div className="flex space-x-2">
                    <button className="px-4 py-1 bg-green-500 hover:bg-green-600 rounded-lg"
                    onClick={()=>changeStatus(leave._id,"Approved")}>Approve</button>
                    <button className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    onClick={()=>changeStatus(leave._id,"Rejected")}>Reject</button>
                  </div>):<p className="font-medium"> {leave.status}</p>}
               
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500 text-lg">
          Loading...
        </div>
      )}
    </>
  );
};

export default Detail;
