import userModel from "../models/userModel";


const exportFileData = async () => {
    try {
        let users = [];
        const data = await userModel.find({});
        data.forEach((user) => {
            const { id, name, email, contact } = user;
            users.push({ id, name, email, contact });
        });

        const csvFields = ['Id', 'Name', 'Email', 'Contact'];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(users);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=usersData.csv");
        res.status(200).end(csvData);

    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message })
    }
}


export { exportFileData };