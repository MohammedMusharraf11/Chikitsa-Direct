import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import doctorRouter from './routes/doctorRoute.js'


//  App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// Middlewares
app.use(express.json())
app.use(cors())

// API Endpoint
app.use('/app/admin',adminRouter)
app.use('/api/doctor', doctorRouter);
app.use('/app/user',userRouter)
// localhost: 4000/api/admin/add-doctor

app.get('/',(req,res)=>{
    res.send('API Working YO')
})

app.listen(port, ()=> console.log("Server Started", port))