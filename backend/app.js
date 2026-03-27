import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()

let isInitialized = false

const initializeServices = async () => {
    if (isInitialized) return

    await connectDB()
    await connectCloudinary()
    isInitialized = true
}

initializeServices().catch((error) => {
    console.error('Backend initialization failed:', error)
})

app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'MediSphere backend is running' })
})

export default app