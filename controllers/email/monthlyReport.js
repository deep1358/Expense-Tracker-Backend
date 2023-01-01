const months = require("../../utils/months");

module.exports = async (_req, res) => {
    const users = await require("./utils/getAllUsers")();

    const currentMonth = new Date().getMonth();
    const month = currentMonth === 0 ? 12 : currentMonth;

    const currentYear = new Date().getFullYear();
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;

    const query = { year, month };

    const results = [];

    // Loop through all users and get their monthly report data
    for (const user of users) {
        const {
            _id,
            userEmail,
            email_subscription: { monthly },
        } = user;

        if (!monthly) continue;

        const categoryWiseExpense =
            (await require("../../utils/getCategoryWiseExpense")(query, _id)) ??
            [];

        const paymentModeWiseExpense =
            (await require("../../utils/getPaymentModeWiseExpense")(
                query,
                _id
            )) ?? [];

        // Total expense
        const totalExpense = categoryWiseExpense.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );

        const subject = `Expense Report for ${months[month - 1]} ${year}`;
        const message = `Thank you for using Expense Tracker. Here is your expense report for the month of ${
            months[month - 1]
        } ${year}.`;

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
    return res.status(200).json({ results });
};
