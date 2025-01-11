import axios from "axios";
import { useNavigate } from "react-router-dom";



export const columns =[
  {
      name:"S No",
      selector:(row)=>row.sno,
      width:"70px"
  
  },
  {
      name:"Name",
      selector:(row)=>row.name,
      sortable:true,
      width:"200px"

  },
  {
      name:"Image",
      selector:(row)=>row.profileImage,
      width:"150px"
       
  },
  {
      name:"Department",
      selector:(row)=>row.dep_name,
      width:"150px"
     
  },
  {
      name:"dob",
      selector:(row)=>row.dob,
      sortable:true,
      width:"100px"
  },
  {
      name:"Action",
      selector:(row)=>row.action,
      center:"true"
  },
]



export const fetchdepartments=async()=>{
      let departments;
    try {

      const response =await axios.get("http://localhost:4000/api/department",{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success){
       departments=response.data.departments

      }
        
    } catch (error) {
      console.log(error);
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
      
    }
    return departments
   }

//employees for salary form

export const getEmployees=async(id)=>{
  let employees;
try {

  const response =await axios.get(`http://localhost:4000/api/employee/department/${id}`,{
    headers:{
      "Authorization":`Bearer ${localStorage.getItem('token')}`
    }
  })
  
  if (response.data.success){
   employees=response.data.employees

  }
    
} catch (error) {
  console.log(error);
  if(error.response && !error.response.data.success){
    alert(error.response.data.error)
  }
  
}
return employees
}

// export const salcolumns =[
//   {
//       name:"SNo",
//       selector:(row)=>row.sno,
//       width:"70px"
  
//   },
//   {
//       name:"EMP ID",
//       selector:(row)=>row.employeeId,
//       sortable:true,
//       width:"150px"

//   },
//   {
//       name:"SALARY",
//       selector:(row)=>row.basicSalary,
//       width:"150px"
       
//   },
//   {
//       name:"ALLOWANCE",
//       selector:(row)=>row.allowances,
//       width:"150px"
     
//   },
//   {
//       name:"DEDUCTION",
//       selector:(row)=>row.deductions,
//       width:"150px"
//   },
   
//   {
//     name:"TOTAL",
//     selector:(row)=>row.netSalary,
//     sortable:true,
//     width:"100px"
//   },

//   {
//       name:"PAY DATE",
//       selector:(row)=>row.payDate,
//       center:"true",
//       width:"150px"
//   },
// ]


export const EmployeeButtons =({Id})=>{
    const navigate=useNavigate();
    
    // const handleDelete =async(id)=>{
    //     const confirm=window.confirm("Do you want to delete?")
    //     if(confirm){
    //         try {
    //             const response = await axios.delete(`http://localhost:4000/api/department/${id}`,{
    //               headers:{
    //                 "Authorization":`Bearer ${localStorage.getItem('token')}`
    //               }
    //             })
          
    //             if(response.data.success){
    //             onDepDelete(id)
    //             }
              
    //            } catch (error) {
    //             if(error.response && !error.response.data.success){
    //               alert(error.response.data.error)
    //             }
    //            }
    //     }
    // }

    return(
        <div className="flex space-x-3">
            <button className="px-4 py-1 bg-purple-500 text-white"
             onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}>View</button>
            <button className="px-4 py-1 bg-orange-500 text-white"
            onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)}>Edit</button>
            <button className="px-4 py-1 bg-green-500 text-white"
            onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}>Salary</button>
            <button className="px-4 py-1 bg-red-500 text-white">Leave</button>
        </div>
    )
}





