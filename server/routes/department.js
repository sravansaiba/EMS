import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addDepartment, getDepartments ,getDepartment, updateDepartment,deleteDepartment} from '../controllers/departmentController.js'

const depRouter=express.Router()

depRouter.get('/',authMiddleware,getDepartments)
depRouter.post('/add',authMiddleware,addDepartment)
depRouter.get('/:id',authMiddleware,getDepartment)
depRouter.put('/:id',authMiddleware,updateDepartment)
depRouter.delete('/:id',authMiddleware,deleteDepartment)


export default depRouter