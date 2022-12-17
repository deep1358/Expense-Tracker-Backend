const Expense = require("../db/models/Expense");
const months = require("./months");
const QueryObject = require("./QueryObject");

module.exports = (query, user_id) => {
    return new Promise((resolve, reject) => {
        Expense.aggregate([
            {
                $match: QueryObject(query, user_id),
            },
            {
                $group: {
                    _id: "$month",
                    amount: { $sum: "$amount" },
                },
            },
        ])
            .then((expenses) => {
                // Change key _id to month
                expenses.forEach((expense) => {
                    return delete Object.assign(expense, {
                        ["month"]: expense["_id"],
                    })["_id"];
                });

                // Sort by month and Convert month number to month name
                expenses
                    .sort((a, b) => a.month - b.month)
                    .forEach((expense) => {
                        expense.month = months[expense.month - 1];
                    });

                resolve(expenses);
            })
            .catch((err) =>
                reject(err.message || "Error while getting month wise expense")
            );
    });
};
