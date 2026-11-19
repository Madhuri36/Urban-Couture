
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

// CORS Configuration
const allowedOrigins = [
    'https://urban-couture.vercel.app',
    'http://localhost:5173'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Middlewares
app.use(express.json())

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Root Route
app.get('/', (req, res) => {
    res.send('API working')
})

// Start Server
const startServer = async () => {
    try {
        await connectDB()
        await connectCloudinary()

        app.listen(port, () => {
            console.log('Server is listening to PORT: ' + port)
        })
    } catch (error) {
        console.error('Server startup failed:', error)
        process.exit(1)
    }
}

startServer()
