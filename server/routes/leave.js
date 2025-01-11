import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addLeave, getLeaves } from '../controllers/leaveController.js'



const leaRouter=express.Router()

leaRouter.post('/add',authMiddleware,addLeave)
leaRouter.get('/:id',authMiddleware,getLeaves)




export default leaRouter