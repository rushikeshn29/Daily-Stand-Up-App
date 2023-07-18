import express from 'express';
const router = express.Router();
import { addDepartment, getDepartments, getTeamLead, sendUserPasswordResetEmail, userLogin, userPasswordReset, userRegistration } from '../controllers/authController.js';
import { upload } from '../utils/multer.js';
import { validateUserRegistration, validateUserLogin } from '../middlewares/auth.js';
export default [
    // Public Routes
    router.post('/register', upload.single('profileImage'), validateUserRegistration, userRegistration),
    router.post('/login', validateUserLogin, userLogin),
    router.post('/send-reset-password-email', sendUserPasswordResetEmail),
    router.post('/reset-password/:id/:token', userPasswordReset),
    router.get('/getTeamLead/:id', getTeamLead),
    router.post('/addDepartment', addDepartment),
    router.get('/getDepartments', getDepartments),

]