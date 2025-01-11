import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addSalary,getSalary } from '../controllers/salaryController.js'


const salRouter=express.Router()

salRouter.post('/add',authMiddleware,addSalary)
salRouter.get('/:id',authMiddleware,getSalary)




export default salRouter