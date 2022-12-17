module.exports = async (req, res) => {
    // const usersId = await require("./utils/getAllUsersId")();

    // const year = new Date().getFullYear() - 1;

    // const categoryWiseQuery = {
    //     year,
    //     month: "All",
    //     day: "All",
    //     payment_mode: "All",
    // };
    // const paymentModeWiseQuery = {
    //     year,
    //     month: "All",
    //     day: "All",
    //     category: "All",
    // };

    // const response = [];

    // // Loop through all users and get their monthly report data
    // for (const user_id of usersId) {
    //     const categoryWiseExpense =
    //         await require("../../utils/getCategoryWiseExpense")(
    //             categoryWiseQuery,
    //             user_id
    //         );
    //     const paymentModeWiseExpense =
    //         await require("../../utils/getPaymentModeWiseExpense")(
    //             paymentModeWiseQuery,
    //             user_id
    //         );

    //     // Total expense
    //     const totalExpense = categoryWiseExpense.reduce(
    //         (acc, curr) => acc + curr.amount,
    //         0
    //     );

    //     response.push({
    //         user_id: user_id["_id"],
    //         totalExpense,
    //         categoryWiseExpense,
    //         paymentModeWiseExpense,
    //     });
    // }
    // console.log(response);
    res.json({ Data: "Ye" });
};
