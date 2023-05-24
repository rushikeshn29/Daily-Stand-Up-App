import express from 'express';
const router = express.Router();
import { exportFileData } from '../controllers/userController';

export default [
    // Private Routes
    router.post('/export', exportFileData),
]