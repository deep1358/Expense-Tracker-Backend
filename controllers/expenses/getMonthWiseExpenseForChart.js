const User = require("../../db/models/User");
const getMonthWiseExpense = require("../../utils/getMonthWiseExpense");

module.exports = (req, res) => {
    const { user_id } = req.headers;

    // Check if user exists
    User.findById(user_id)
        .then((userRes) => {
            if (userRes) {
                getMonthWiseExpense(req.query, user_id)
                    .then((expenses) => res.status(200).send(expenses))
                    .catch((err) => res.status(400).json({ message: err }));
            } else res.status(404).json({ message: "User not found" });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};
