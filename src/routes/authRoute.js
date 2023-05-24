import express from 'express';
const router = express.Router();
import { userLogin, userRegistration } from '../controllers/authController.js';

import { authRules } from '../validations/authValidation.js';
import { upload } from '../utils/multer.js';
export default [

    // Public Routes
    router.post('/register', upload.single('profileImage'), userRegistration),
    router.post('/login', userLogin),
]