import mongoose from "mongoose";
import chalk from "chalk";

//Established mongooes database connection
const connectDB = async () => {

    mongoose.set("strictQuery", false);
    try {
        const { DATABASE_URL, DATABASE_NAME } = process.env;
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: DATABASE_NAME
        };
        await mongoose.connect(DATABASE_URL, dbOptions);
        console.log(chalk.green("Database connected successfully..."));
    } catch (error) {
        console.log(error.message);
    }
};

export default connectDB;
