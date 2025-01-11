import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { addEmployee,upload,getEmployees,getEmployee,updatEmployee,fetchEmployeesByDepId} from '../controllers/employeeController.js'

const empRouter = express.Router()


empRouter.get('/',authMiddleware,getEmployees)
empRouter.post('/add',authMiddleware,upload.single('image'),addEmployee)
empRouter.get('/:id',authMiddleware,getEmployee)
empRouter.put('/:id',authMiddleware,updatEmployee)
empRouter.get("/department/:id",authMiddleware,fetchEmployeesByDepId)



export default empRouter