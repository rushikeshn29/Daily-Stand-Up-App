import express from 'express';
const router = express.Router();
import { userLogin, userRegistration } from '../controllers/authController.js';
import { upload } from '../utils/multer.js';
import { validateUserRegistration, validateUserLogin } from '../middlewares/auth.js';
export default [
    // Public Routes
    router.post('/register', validateUserRegistration, upload.single('profileImage'), userRegistration),
    router.post('/login', validateUserLogin, userLogin),
]