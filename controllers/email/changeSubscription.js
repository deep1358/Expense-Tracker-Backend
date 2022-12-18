const User = require("../../db/models/User");

module.exports = (req, res) => {
    // Check if user exists

    const { user_id } = req.headers;
    const { email_subscription } = req.body;

    User.findById(user_id).then((userRes) => {
        if (userRes) {
            User.findByIdAndUpdate(user_id, {
                email_subscription,
            })
                .then(() => {
                    res.status(200).json({
                        message: "Email subscription updated successfully",
                    });
                })
                .catch((err) => {
                    res.status(500).json({ message: err.message });
                });
        } else res.status(404).json({ message: "User not found" });
    });
};
