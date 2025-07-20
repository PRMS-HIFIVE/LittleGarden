import express from 'express';
import { createPlant, deletePlant, getPlants, updatePlant } from '../controller/plantController';
import { authenticateToken } from '../middleware/authMiddleware';
import { createPlantValidator, deletePlantValidator, updatePlantValidator } from '../middleware/validator';

const router = express.Router();

router.route('/')
    .get(authenticateToken, getPlants)
    .post(authenticateToken, createPlantValidator, createPlant)

router.route('/:plantId')
    .put(authenticateToken, updatePlantValidator, updatePlant)
    .delete(authenticateToken, deletePlantValidator, deletePlant)

export default router;