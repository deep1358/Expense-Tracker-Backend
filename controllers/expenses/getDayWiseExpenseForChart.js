const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const getMonthWiseDays = require("../../utils/getMonthWiseDays");
const QueryObject = require("../../utils/QueryObject");

module.exports = (req, res) => {
    const { user_id } = req.headers;

    const { year, month } = req.query;

    // Check if user exists
    User.findById(user_id)
        .then((userRes) => {
            if (userRes) {
                // Find expense based on query params
                Expense.aggregate([
                    {
                        $match: QueryObject(req.query, user_id),
                    },
                    {
                        $group: {
                            _id: "$day",
                            amount: { $sum: "$amount" },
                        },
                    },
                ])
                    .then((expenses) => {
                        // Change key _id to day
                        expenses.forEach((expense) => {
                            return delete Object.assign(expense, {
                                ["day"]: expense["_id"],
                            })["_id"];
                        });

                        // Add remaining days with amount 0
                        getMonthWiseDays(month, year).forEach((day) => {
                            if (
                                !expenses.some((expense) => expense.day === day)
                            )
                                expenses.push({ amount: 0, day });
                        });

                        // Sort expenses by day
                        expenses.sort((a, b) => a.day - b.day);

                        // Convert day to proper format
                        expenses.forEach((expense) => {
                            expense.day = `${expense.day} ${new Date(
                                year,
                                month - 1,
                                expense.day
                            ).toLocaleDateString("en-US", {
                                month: "short",
                            })}`;
                        });

                        return res.status(200).json(expenses);
                    })
                    .catch((err) =>
                        res
                            .status(400)
                            .json({ message: err.message || "Error" })
                    );
            } else return res.status(404).json({ message: "User not found" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};
