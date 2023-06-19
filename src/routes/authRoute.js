import express from 'express';
const router = express.Router();
import { getTeamLead, userLogin, userRegistration, addDepartment, getDepartments } from '../controllers/authController.js';
import { upload } from '../utils/multer.js';
import { validateUserRegistration, validateUserLogin } from '../middlewares/auth.js';
export default [

    // Public Routes
    router.post('/register', upload.single('profileImage'), validateUserRegistration, userRegistration),
    router.post('/login', validateUserLogin, userLogin),
    router.post('/addDepartment', addDepartment),
    router.get('/getDepartments', getDepartments),
    router.get('/getTeamLead/:id', getTeamLead)
]