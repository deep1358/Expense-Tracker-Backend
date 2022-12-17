const nodemailer = require("nodemailer");
const months = require("../../../utils/months");

module.exports = async (
    userEmail,
    totalExpense,
    categoryWiseExpense,
    paymentModeWiseExpense
) => {
    console.log("Sending email to: " + userEmail);

    const transporter = nodemailer.createTransport({
        auth: {
            user: process.env.NODEMAILER_EMAIL_ID,
            pass: process.env.NODEMAILER_EMAIL_PASSWORD,
        },
        host: "smtp.gmail.com",
        port: 465,
        secureConnection: true,
        secure: true, // use SSL
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
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
            months
        ),
    };

    console.log("start");
    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(messageOptions, function (error, info) {
            console.log(info, error);
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(`Email has successfully sent!`);
                resolve(info);
            }
        });
    });
    console.log("end");
};
