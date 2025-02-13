import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"

const addLeave =async(req,res)=>{
    try {
        const {userId,leaveType,startDate,endDate,reason}=req.body

        const employee=await Employee.findOne({userId})

        const newLeave = new Leave({
            employeeId:employee._id,
            leaveType,
            startDate,
            endDate,
            reason,
        }) 

        await newLeave.save()

        return res.status(200).json({success:true,status:newLeave.status})

    } catch (error) {
       console.log(error);
       
        return res.status(500).json({success:false,error:"request leave add error"})  
    }
}


const getLeaves =async(req,res)=>{

    const {id} =req.params;

    try {
        const employee=await Employee.findOne({userId:id})
        const leaves=await Leave.find({employeeId:employee._id})
        return res.status(200).json({success:true,leaves})
    } 
    catch (error) {    
        return res.status(500).json({success:false,error:" get leaves details server error"})
    }

} 

const getLeavess=async(req,res)=>{

    try {
        const leaves = await Leave.find().populate({
            path:"employeeId",
            populate:[
                {
                    path:'department',
                    select:'dep_name'
                },
                {
                    path:'userId',
                    select:'name'
                }
            ]

        })
        
        return res.status(200).json({success:true,leaves})
    } 
    catch (error) {    
        return res.status(500).json({success:false,error:" get leavess details server error"})
    }

}


const getLeaveDetail =async(req,res)=>{

    try {
        const {id} =req.params
        const leave = await Leave.findById({_id:id}).populate({
            path:"employeeId",
            populate:[
                {
                    path:'department',
                    select:'dep_name'
                },
                {
                    path:'userId',
                    select:'name profileImage'
                }
            ]

        })
        
        return res.status(200).json({success:true,leave})
    } 
    catch (error) {    
        return res.status(500).json({success:false,error:" get LeaveDetail server error"})
    }
}




export {addLeave,getLeaves,getLeavess,getLeaveDetail}