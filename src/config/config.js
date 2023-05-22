import mongoose from "mongoose";
import chalk from "chalk";

//Established mongooes database connection
const connectDB = async () => {
    mongoose.set("strictQuery", false);
    try {
        const uri = process.env.DATABASE_URL;
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DATABASE_NAME
        };
        await mongoose.connect(uri, dbOptions);
        console.log(chalk.green("Database connected successfully..."));
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
