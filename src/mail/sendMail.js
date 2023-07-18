import ejs from 'ejs';
import path from 'path';
import { __dirname } from "../index.js";
import transporter from "../config/emailConfig.js";
import { DateFormatter } from '../utils/common.js';


export const sendEmail = (data) => {

    let mailData = data?.pop();
    const filePath = path.join(__dirname, '/src/templates/dailyUpdates.ejs');
    ejs.renderFile(`${filePath}`, { data, mailData }, (err, data) => {
        if (err) {
            console.log(err.message);
        } else {
            var mailOptions = {
                from: mailData.teamLeadIdEmail,
                to: "saurabhkute321@gmail.com",
                subject: `MOM - Daily Standup with Team - ${mailData.teamLeadName} - - on ${DateFormatter(new Date())}`,
                html: data + mailData
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
        }
    });
};