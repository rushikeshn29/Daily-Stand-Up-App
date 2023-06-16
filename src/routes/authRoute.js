import express from 'express';
const router = express.Router();
import { getTeamLead, userLogin, userRegistration } from '../controllers/authController.js';
import { upload } from '../utils/multer.js';
import { validateUserRegistration, validateUserLogin } from '../middlewares/auth.js';
export default [
    // Public Routes
    router.post('/register', upload.single('profileImage'), userRegistration),
    router.post('/login', validateUserLogin, userLogin),
    router.get('/getTeamLead', getTeamLead),

]