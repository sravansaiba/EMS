import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import depRouter from './routes/department.js'
import empRouter from './routes/employee.js'
import salRouter from './routes/salary.js'
import leaRouter from './routes/leave.js'
import setRouter from './routes/setting.js'
import connectToDatabase from './db/db.js'


connectToDatabase()
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use("/api/auth",authRouter)
app.use("/api/department",depRouter)
app.use("/api/employee",empRouter)
app.use("/api/salary",salRouter)
app.use("/api/leave",leaRouter)
app.use("/api/setting",setRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    
})