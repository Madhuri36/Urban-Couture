
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 4000

// CORS Configuration
app.use(cors({
    origin: [
        'https://urban-couture.vercel.app',
        'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Middlewares
app.use(express.json())

// Root Route (does not require database)
app.get('/', (req, res) => {
    res.status(200).send('API working')
})

// Configure Cloudinary
connectCloudinary().catch(err => {
    console.error('Cloudinary configuration error:', err)
})

// Ensure MongoDB is connected before API requests
app.use('/api', async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (error) {
        console.error('Database connection error:', error.message)
        res.status(503).json({
            success: false,
            message: 'Database connection failed'
        })
    }
})

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Error Handling
app.use((err, req, res, next) => {
    console.error('Server error:', err)
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
})

// Export Express app for Vercel
export default app

// Local development only
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}
