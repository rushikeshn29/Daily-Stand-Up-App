import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userModel from '../models/userModel.js';
dotenv.config();
mongoose.set('strictQuery', false);

// Mongoose Seeder for Admin Registration

const seedData = async () => {
  try {
    const uri = process.env.DATABASE_URL;
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DATABASE_NAME //Database name
    };
    await mongoose.connect(uri, dbOptions)
    let connClosed = false
    const userData = await userModel.findOne({ email: 'admin@yopmail.com' })
    if (!userData) {
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash('Admin#123', salt)
      const adminData = {
        firstName: 'User',
        lastName: 'Admin',
        email: 'admin@yopmail.com',
        employeeId: '10102',
        department: 'JavaScript',
        teamLead: 'NA',
        contact: '7777777777',
        password,
        profileImage: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942408_960_720.jpg'

      }
      const res = await new userModel(adminData).save()
      if (res) {
        connClosed = true
      }
    } else {
      connClosed = true
    }
    if (connClosed) {
      mongoose.connection.close()
    }
  } catch (error) {
    console.log('error:', error)
  }
}
export default seedData;
