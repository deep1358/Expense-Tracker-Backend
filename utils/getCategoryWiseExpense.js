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
                    _id: "$category",
                    amount: { $sum: "$amount" },
                },
            },
        ])
            .then((expenses) => {
                // Change key _id to category and add category name to categoriesFromRes
                expenses.forEach((expense) => {
                    return delete Object.assign(expense, {
                        ["category"]: expense["_id"],
                    })["_id"];
                });

                resolve(expenses);
            })
            .catch((err) =>
                reject(
                    err.message || "Error while getting category wise expense"
                )
            );
    });
};
