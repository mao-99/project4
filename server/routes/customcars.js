import express from 'express';
import { createCustom, getCustom, deleteCustom } from '../controllers/customCars.js';

const router = express.Router();

// Create a new custom car
router.post('/', createCustom);

// Get a specific custom car
router.get('/:id', getCustom);

// Delete a specific custom car
router.delete('/:id', deleteCustom);

export {router};