const nodemailer = require("nodemailer");

module.exports = async (
    userEmail,
    subject,
    message,
    totalExpense,
    categoryWiseExpense,
    paymentModeWiseExpense,
    monthWiseExpense
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

            const messageOptions = {
                from: `Expense Tracker <${process.env.NODEMAILER_EMAIL_ID}>`,
                to: userEmail,
                subject,
                html: require("./EmailTemplate")(
                    totalExpense,
                    categoryWiseExpense,
                    paymentModeWiseExpense,
                    message,
                    monthWiseExpense
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
