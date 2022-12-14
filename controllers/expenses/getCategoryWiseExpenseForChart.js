const User = require("../../db/models/User");
const getCategoryWiseExpense = require("../../utils/getCategoryWiseExpense");

module.exports = (req, res) => {
    const { user_id } = req.headers;

    // Check if user exists
    User.findById(user_id, { categories: 1 })
        .then((userRes) => {
            if (userRes) {
                // Find expense based on query params
                getCategoryWiseExpense(req.query, user_id)
                    .then((expenses) => res.status(200).send(expenses))
                    .catch((err) => res.status(400).json({ message: err }));
            } else res.status(404).json({ message: "User not found" });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};
