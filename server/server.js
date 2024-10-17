import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'

// import the router from your routes file
import {router as carRouter} from './routes/cars.js'
import {router as customRouter} from './routes/customcars.js'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/api/cars' , carRouter)
app.use('/api/customcars', customRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})