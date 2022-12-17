const months = require("../../utils/months");

module.exports = async (_req, res) => {
    const users = await require("./utils/getAllUsersEmailAndID")();

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const categoryWiseQuery = { year, month, day: "All", payment_mode: "All" };
    const paymentModeWiseQuery = { year, month, day: "All", category: "All" };

    const response = [],
        results = [];

    // Loop through all users and get their monthly report data
    for (const user of users) {
        const { _id, userEmail } = user;

        const categoryWiseExpense =
            (await require("../../utils/getCategoryWiseExpense")(
                categoryWiseQuery,
                _id
            )) ?? [];
        const paymentModeWiseExpense =
            (await require("../../utils/getPaymentModeWiseExpense")(
                paymentModeWiseQuery,
                _id
            )) ?? [];

        // Total expense
        const totalExpense = categoryWiseExpense.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );

        response.push({
            userEmail,
            totalExpense,
            categoryWiseExpense,
            paymentModeWiseExpense,
        });

        const subject = `Expense Report for ${
            months[new Date().getMonth() - 1]
        } ${new Date().getFullYear()}`;
        const message = `Thank you for using Expense Tracker. Here is your expense report for the month of ${
            months[new Date().getMonth() - 1]
        } ${new Date().getFullYear()}.`;

        try {
            results.push(
                await require("./utils/SendEmail")(
                    userEmail,
                    subject,
                    message,
                    totalExpense,
                    categoryWiseExpense,
                    paymentModeWiseExpense
                )
            );
        } catch (err) {
            results.push(err);
        }
    }
    res.status(200).json({ results });
};
