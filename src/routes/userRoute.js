import express from 'express';
const router = express.Router();
import { addUserUpdates, deleteUserUpdates, exportFileData, getUserUpdates, updateUserUpdates, getEmployeesOfTL, getEmployeesTodaysUpdates, getEmployeeDetailsById, getUpdatesOfWeek } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
import { validateUserUpdates } from '../middlewares/user.js';

export default [
    // Private Routes
    router.post('/addUpdates/:id1/:id2', auth,  addUserUpdates),
    router.put('/updateUpdates/:id', auth,  updateUserUpdates),
    router.delete('/deleteUpdates/:id', auth, deleteUserUpdates),
    router.get('/getUserData/:id', auth, getUserUpdates),
    router.get('/getEmployees/:id', auth, getEmployeesOfTL),
    router.get('/getTodaysUpdates/:id', auth, getEmployeesTodaysUpdates),
    router.get('/getEmployeeDetails/:id', auth, getEmployeeDetailsById),
    router.get('/getWeeksUpdates/:id', auth, getUpdatesOfWeek),
    router.get('/export/:id', auth, exportFileData),
]