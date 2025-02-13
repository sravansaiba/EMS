import { useNavigate } from "react-router-dom"


export const columns =[
    {
        name:"S NO",
        selector:(row)=>row.sno,
        width:"150px"
    },
    {
        name:"Emp ID",
        selector:(row)=>row.employeeId,
        width:"150px"
    },
    {
        name:"Name",
        selector:(row)=>row.name,
        width:"155px"
    },
    {
        name:"Leave Type",
        selector:(row)=>row.leaveType,
        width:"150px"
    },
    {
        name:"Department",
        selector:(row)=>row.department,
        width:"155px"
    },
    {
        name:"Days",
        selector:(row)=>row.days,
        width:"150px"
    },
    {
        name:"Status",
        selector:(row)=>row.status,
        width:"150px"
    },
    {
        name:"Action",
        selector:(row)=>row.action,
        width:"150px",
        
    },
    
]

export const LeaveButtons =({Id})=>{
    const navigate = useNavigate()
    const handleView = (id)=>{
        navigate(`/admin-dashboard/leaves/${id}`);
    }

    return(
        <button
        className="px-4 py-1 bg-purple-500 rounded text-black hover:bg-purple-500"
        onClick={()=>handleView(Id)}>view</button>
    )
}