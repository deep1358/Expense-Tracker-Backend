module.exports = async (_req, res) => {
    const users = await require("./utils/getAllUsersEmailAndID")();

    const year = new Date().getFullYear() - 1;

    const categoryWiseQuery = {
        year,
        month: "All",
        day: "All",
        payment_mode: "All",
    };
    const paymentModeWiseQuery = {
        year,
        month: "All",
        day: "All",
        category: "All",
    };
    const monthWiseQuery = {
        year,
        month: "All",
        day: "All",
        category: "All",
        payment_mode: "All",
    };

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

        const monthWiseExpense =
            (await require("../../utils/getMonthWiseExpense")(
                monthWiseQuery,
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
            monthWiseExpense,
        });

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
