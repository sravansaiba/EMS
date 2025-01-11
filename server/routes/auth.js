import express from "express"
import {login} from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import { verify } from "../controllers/authController.js"

const authRouter =express.Router()
authRouter.post('/login',login)
authRouter.get('/verify',authMiddleware,verify)

export default authRouter



