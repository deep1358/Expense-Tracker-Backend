const nodemailer = require("nodemailer");
const months = require("../../../utils/months");

module.exports = (
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
    transporter.sendMail(messageOptions, function (error, info) {
        console.log(info, error);
        if (error) {
            console.log(error);
        } else {
            console.log(`Email has successfully sent!`);
        }
    });
    console.log("end");
};
