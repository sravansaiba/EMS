import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { changePassword } from '../controllers/settingController.js'



const setRouter=express.Router()

setRouter.put('/change-password',authMiddleware,changePassword)




export default setRouter