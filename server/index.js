import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const port = process.env.PORT || 5000

const app = express()
dotenv.config()

connectDB()

//Middleware
app.use(express.json())
app.use(cors())

//Routes Middleware
app.use('/users', userRoutes)


// Custom Error Middleware 
app.use(notFound)
app.use(errorHandler)


app.get('/', (req, res) => {
    res.send('Server is running...✅ ')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`.yellow.bold);
})