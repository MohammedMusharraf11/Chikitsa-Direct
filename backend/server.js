import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/doctorRoute.js'


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
// localhost: 4000/api/admin/add-doctor

app.get('/',(req,res)=>{
    res.send('API Working YO')
})

app.listen(port, ()=> console.log("Server Started", port))