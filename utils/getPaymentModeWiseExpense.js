const Expense = require("../db/models/Expense");
const QueryObject = require("./QueryObject");

module.exports = (query, user_id) => {
    return new Promise((resolve, reject) => {
        Expense.aggregate([
            {
                $match: QueryObject(query, user_id),
            },
            {
                $group: {
                    _id: "$payment_mode",
                    amount: { $sum: "$amount" },
                },
            },
        ])
            .then((expenses) => {
                // Change key _id to payment_mode
                expenses.forEach((expense) => {
                    return delete Object.assign(expense, {
                        ["payment_mode"]: expense["_id"],
                    })["_id"];
                });

                resolve(expenses);
            })
            .catch((err) =>
                reject(
                    err.message ||
                        "Error while getting payment mode wise expense"
                )
            );
    });
};
