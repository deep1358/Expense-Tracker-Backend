const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
    const { user_id } = req.headers;
    const { category, amount, note, date, payment_mode } = req.body;

    // Get year, month, and day from date
    const [year, month, day] = date.split("-");

    // Check if user exists
    User.findById(user_id)
        .then((userRes) => {
            if (userRes) {
                // Check if category exists
                if (categoryExists(userRes.categories, category))
                    Expense.create({
                        category,
                        amount,
                        note,
                        user_id,
                        year,
                        month,
                        day,
                        payment_mode,
                    })
                        .then((expense) =>
                            res.status(200).json({
                                message: "Expense created successfully",
                                expense: {
                                    category: expense.category,
                                    amount: expense.amount,
                                    note: expense.note,
                                    year: expense.year,
                                    month: expense.month,
                                    day: expense.day,
                                    _id: expense._id,
                                    payment_mode: expense.payment_mode,
                                },
                            })
                        )
                        .catch((err) =>
                            res.status(500).json({ message: err.message })
                        );
                else
                    return res
                        .status(404)
                        .json({ message: "Category not found" });
            } else return res.status(404).json({ message: "User not found" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};
