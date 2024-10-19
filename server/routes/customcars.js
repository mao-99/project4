import express from 'express';
import { createCustom, getCustom, deleteCustom, getCustoms } from '../controllers/customCars.js';

const router = express.Router();

// Create a new custom car
router.post('/', createCustom);

// Get a specific custom car
router.get('/:id', getCustom);

// Delete a specific custom car
router.delete('/:id', deleteCustom);

// Get all customs
router.get('/', getCustoms)

export {router};