import express from 'express'
import { getCars, getCar } from '../controllers/cars.js'

const router = express.Router()

router.get('/', getCars)
router.get('/:id', getCar)

export {router};