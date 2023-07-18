import express from 'express';
const router = express.Router();
import { addUserUpdates, deleteUserUpdates, getTableData, getUserUpdates, exportAllDataForExcel, updateUserUpdates, getEmployeesOfTL, getEmployeesTodaysUpdates, getEmployeeDetailsById, getUpdatesOfWeek, mailFields } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
import { validateUserUpdates } from '../middlewares/user.js';

export default [
    // Private Routes
    router.post('/addUpdates/:teamLeadId', addUserUpdates),
    router.put('/updateUpdates/:id', updateUserUpdates),
    router.delete('/deleteUpdates/:id', deleteUserUpdates),
    router.get('/getUserData/:id', getUserUpdates),
    router.get('/getEmployees/:id', getEmployeesOfTL),
    router.get('/getTodaysUpdates/:id', getEmployeesTodaysUpdates),
    router.get('/getEmployeeDetails/:id', getEmployeeDetailsById),
    router.get('/getWeeksUpdates/:id', getUpdatesOfWeek),
    router.get('/getTableData/:id', getTableData),
    router.post('/addMailFieldsData/:id', mailFields),
    router.get('/exportData/:id', exportAllDataForExcel)
]