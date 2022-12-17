const nodemailer = require("nodemailer");
const months = require("../../../utils/months");

module.exports = async (
    userEmail,
    totalExpense,
    categoryWiseExpense,
    paymentModeWiseExpense
) =>
    new Promise(async (resolve, reject) => {
        const transporter = nodemailer.createTransport({
            auth: {
                user: process.env.NODEMAILER_EMAIL_ID,
                pass: process.env.NODEMAILER_EMAIL_PASSWORD,
            },
            host: "smtp.gmail.com",
            secure: true, // use SSL
        });

        const messageOptions = {
            from: `Expense Tracker <${process.env.NODEMAILER_EMAIL_ID}>`,
            to: process.env.NODEMAILER_EMAIL_ID,
            subject: `Expense Report for ${
                months[new Date().getMonth() - 1]
            } ${new Date().getFullYear()}`,
            html: require("./EmailTemplate")(
                totalExpense,
                categoryWiseExpense,
                paymentModeWiseExpense,
                months[new Date().getMonth() - 1]
            ),
        };

        transporter.sendMail(messageOptions, function (error, info) {
            console.log(info);
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(`Email has successfully sent!`);
                resolve("Email has successfully sent!");
            }
        });
    });
