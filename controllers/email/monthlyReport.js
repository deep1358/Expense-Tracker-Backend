module.exports = async (_req, res) => {
    const users = await require("./utils/getAllUsersEmailAndID")();

    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const categoryWiseQuery = { year, month, day: "All", payment_mode: "All" };
    const paymentModeWiseQuery = { year, month, day: "All", category: "All" };

    const response = [];

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
        try {
            const result = await require("./utils/SendEmail")(
                userEmail,
                totalExpense,
                categoryWiseExpense,
                paymentModeWiseExpense
            );
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
    res.json(response);
};
