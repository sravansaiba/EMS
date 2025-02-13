import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addLeave, getLeaves, getLeavess,getLeaveDetail } from '../controllers/leaveController.js'



const leaRouter=express.Router()

leaRouter.post('/add',authMiddleware,addLeave)
leaRouter.get('/:id',authMiddleware,getLeaves)
leaRouter.get('/detail/:id',authMiddleware,getLeaveDetail)
leaRouter.get('/',authMiddleware,getLeavess)




export default leaRouter