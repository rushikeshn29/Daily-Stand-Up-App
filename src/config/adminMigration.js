import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userModel from '../models/userModel.js';
dotenv.config({ path: '../.env' });
mongoose.set('strictQuery', false);

// Mongoose Seeder for Admin Registration
const seedData = async () => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASS, DATABASE_URL, SALT, DATABASE_NAME } = process.env;
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DATABASE_NAME,
    };
    await mongoose.connect(DATABASE_URL, dbOptions);
    let connClosed = false;
    const userData = await userModel.findOne({ email: ADMIN_EMAIL }).lean();
    if (!userData) {
      const salt = await bcrypt.genSalt(+SALT);
      const password = await bcrypt.hash(ADMIN_PASS, salt);
      const adminData = {
        firstName: 'User',
        lastName: 'Admin',
        email: ADMIN_EMAIL,
        employeeId: '00000',
        department: 'JavaScript',
        contact: '8256763304',
        password,
        profileImage: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942408_960_720.jpg'
      }
      const res = await new userModel(adminData).save();
      if (res) {
        connClosed = true;
      }
    } else {
      connClosed = true;
    }
    if (connClosed) {
      mongoose.connection.close();
    }
  } catch (error) {
    console.log(error.message);
  }
}
export default seedData;
