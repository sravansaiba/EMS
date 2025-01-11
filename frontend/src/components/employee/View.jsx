// import {useParams} from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import axios from "axios"

// const View = () => {
//   const [employee,setEmployee]=useState(null)
//   const {id} =useParams()

//   useEffect(()=>{     
//     const fetchEmployee=async()=>{
//      try {
       
//        const response =await axios.get(`http://localhost:4000/api/employee/${id}`,{
//          headers:{
//            "Authorization":`Bearer ${localStorage.getItem('token')}`
//          }
//        })


//        console.log(response.data);
       
//        if (response.data.success){
        
//          setEmployee(response.data.employee)
//        }
         
//      } catch (error) {
//        console.log(error);
//        if(error.response && !error.response.data.success){
//          alert(error.response.data.error)
//        }
       
//      }
//     }
   
//    fetchEmployee();
 
//    },[])

//   return (
//     <>{ employee? (

//       <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
//       <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
//         <div>
//         <img src={`http://localhost:4000/${employee.userId.profileImage}`} alt="img"
//         className='rounded-full border w-72' />
//         </div>
//       </div>
//       <div>

//         <div className='flex space-x-3 mb-5'>
//           <p className='textt-lg font-bold'>Name:</p>
//           <p className='font-medium'>{employee.userId.name}</p>
//         </div>

//         <div className='flexx space-x-3 mb-5'>
//            <p className='text-lg font-bold'>Employee ID:</p>
//            <p className='font-medium'>{employee.employeeId}</p>
//         </div>

//         <div className='flexx space-x-3 mb-5'>
//            <p className='text-lg font-bold'>Gender:</p>
//            <p className='font-medium'>{employee.gender}</p>
//         </div>

//         <div className='flexx space-x-3 mb-5'>
//            <p className='text-lg font-bold'>Department:</p>
//            <p className='font-medium'>{employee.department.dep_name}</p>
//         </div>

//         <div className='flexx space-x-3 mb-5'>
//            <p className='text-lg font-bold'>Marital Status:</p>
//            <p className='font-medium'>{employee.maritalStatus}</p>
//         </div>

        

//       </div>
//     </div>


//     ):<div>loading....</div>}</>
   
//   )
// }

// export default View

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const View = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 md:p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={`http://localhost:4000/${employee.userId.profileImage}`}
                alt="Employee"
                className="rounded-full border-4 border-gray-300 w-40 h-40 md:w-52 md:h-52 object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">Name:</p>
                <p className="font-medium text-gray-600">
                  {employee.userId.name}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                  Employee ID:
                </p>
                <p className="font-medium text-gray-600">
                  {employee.employeeId}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">Gender:</p>
                <p className="font-medium text-gray-600">{employee.gender}</p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                  Department:
                </p>
                <p className="font-medium text-gray-600">
                  {employee.department.dep_name}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold text-gray-700">
                  Marital Status:
                </p>
                <p className="font-medium text-gray-600">
                  {employee.maritalStatus}
                </p>
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

export default View;
