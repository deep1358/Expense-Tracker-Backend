const nodemailer = require("nodemailer");
const months = require("../../../utils/months");

module.exports = async (
    userEmail,
    totalExpense,
    categoryWiseExpense,
    paymentModeWiseExpense
) =>
    new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                auth: {
                    user: process.env.NODEMAILER_EMAIL_ID,
                    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
                },
                host: "smtp.gmail.com",
                secure: true, // use SSL
            });

            const subject = `Expense Report for ${
                months[new Date().getMonth() - 1]
            } ${new Date().getFullYear()}`;

            const messageOptions = {
                from: `Expense Tracker <${process.env.NODEMAILER_EMAIL_ID}>`,
                to: userEmail,
                subject,
                html: require("./EmailTemplate")(
                    totalExpense,
                    categoryWiseExpense,
                    paymentModeWiseExpense,
                    months[new Date().getMonth() - 1]
                ),
            };

            transporter.sendMail(messageOptions, function (error, _info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(
                        `${subject} has successfully sent to ${userEmail}!`
                    );
                }
            });
        } catch (err) {
            reject(err);
        }
    });
