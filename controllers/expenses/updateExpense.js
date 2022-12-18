const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
    const { category, amount, note, _id, payment_mode } = req.body;
    const { user_id } = req.headers;

    // Check if user exists
    User.findById(user_id)
        .then((userRes) => {
            if (userRes) {
                // Check if category exists
                if (categoryExists(userRes.categories, category))
                    Expense.findByIdAndUpdate(_id, {
                        category,
                        amount,
                        note,
                        payment_mode,
                    })
                        .then(() =>
                            res.status(200).json({
                                message: "Expense updated successfully",
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
