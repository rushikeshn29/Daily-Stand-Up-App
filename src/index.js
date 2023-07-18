import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import chalk from 'chalk';
import seedData from './config/adminMigration.js';
import connectDB from './config/config.js';
import authRoutes from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config({ path: "./src/.env" });
const app = express();

const port = process.env.PORT;
// CORS Policy
app.use(cors())

//Path
export const __dirname = path.resolve()

app.use(express.static('./src/uploads'));

// Database Connection
await seedData();
connectDB()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Load Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);


app.listen(port, () => {
    console.log(chalk.blue(`Server listening at http://localhost:${port}`));
})