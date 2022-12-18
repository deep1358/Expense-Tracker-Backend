const User = require("../../db/models/User");
const paymentModeExists = require("../../utils/paymentModeExists");

module.exports = (req, res) => {
    const { user_id } = req.headers;
    const { paymentModeName, payment_modes } = req.body;

    // Check if payment mode name contains only alphabets
    if (!/^[a-zA-Z]([a-zA-Z _-]*([a-zA-Z]))?$/.test(paymentModeName.trim()))
        return res
            .status(400)
            .json({ message: "Payment Mode name is invalid" });

    // Check if payment mode name is too long
    if (paymentModeName.trim().length > 20)
        return res
            .status(400)
            .json({
                message: "Maximum payment mode name length must be of 20",
            });

    // Check if payment mode exists
    if (paymentModeExists(payment_modes, paymentModeName.trim()))
        return res.status(400).json({ message: "Payment Mode already exists" });

    User.updateOne(
        { _id: user_id },
        { $addToSet: { payment_modes: paymentModeName.trim() } }
    )
        .then(() => {
            payment_modes.push(paymentModeName.trim());

            return res.status(200).json({
                message: "Payment Mode created successfully",
                payment_modes,
            });
        })
        .catch(() =>
            res.status(500).json({ message: "Error creating Payment Mode" })
        );
};
