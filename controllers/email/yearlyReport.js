module.exports = async (_req, res) => {
    const users = await require("./utils/getAllUsersEmailAndID")();

    const year = new Date().getFullYear() - 1;
    const query = { year };
    const results = [];

    // Loop through all users and get their monthly report data
    for (const user of users) {
        const { _id, userEmail } = user;

        const categoryWiseExpense =
            (await require("../../utils/getCategoryWiseExpense")(query, _id)) ??
            [];

        const paymentModeWiseExpense =
            (await require("../../utils/getPaymentModeWiseExpense")(
                query,
                _id
            )) ?? [];

        const monthWiseExpense =
            (await require("../../utils/getMonthWiseExpense")(query, _id)) ??
            [];

        // Total expense
        const totalExpense = categoryWiseExpense.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );

        const subject = `Expense Report for ${year}`;
        const message = `Thank you for using Expense Tracker. Here is your expense report for the year of ${year}.`;

        try {
            results.push(
                await require("./utils/SendEmail")(
                    userEmail,
                    subject,
                    message,
                    totalExpense,
                    categoryWiseExpense,
                    paymentModeWiseExpense,
                    monthWiseExpense
                )
            );
        } catch (err) {
            results.push(err);
        }
    }
    res.status(200).json({ results });
};
