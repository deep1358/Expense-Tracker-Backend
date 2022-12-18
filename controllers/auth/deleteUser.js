const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

module.exports = (req, res) => {
    const { user_id } = req.headers;

    // Delete User

    User.deleteOne({ _id: user_id }, (err) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            // Delete all expenses of user
            Expense.deleteMany({ user_id })
                .then(() =>
                    res
                        .status(200)
                        .json({ message: "User deleted successfully" })
                )
                .catch((err) => res.status(500).json({ message: err }));
        }
    });
};
