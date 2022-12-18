const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

module.exports = (req, res) => {
    const { user_id } = req.headers;
    const { _id } = req.params;

    // Check if user exists
    User.findById(user_id)
        .then((userRes) => {
            if (userRes)
                Expense.findById(_id)
                    .then((expenses) => res.status(200).json(expenses))
                    .catch((err) =>
                        res.status(500).json({ message: err.message })
                    );
            else return res.status(404).json({ message: "User not found" });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};
