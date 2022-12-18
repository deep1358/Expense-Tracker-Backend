const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");
const paymentModeExists = require("../../utils/paymentModeExists");

module.exports = (req, res) => {
    const { user_id } = req.headers;
    const { oldValue, newValue, payment_modes } = req.body;

    // Check if payment mode name contains only alphabets
    if (!/^[a-zA-Z]([a-zA-Z _-]*([a-zA-Z]))?$/.test(newValue.trim()))
        return res
            .status(400)
            .json({ message: "Payment mode name must be alphabetic" });

    if (paymentModeExists(payment_modes, newValue.trim()))
        // Check if payment mode exists
        return res.status(400).json({ message: "Payment mode already exists" });

    // Check if payment mode name is too long
    if (newValue.trim().length > 20)
        return res
            .status(400)
            .json({
                message: "Maximum payment mode name length must be of 20",
            });

    User.updateOne(
        { _id: user_id, payment_modes: oldValue },
        { $set: { "payment_modes.$": newValue.trim() } }
    )
        .then(() => {
            // update payment_modes in expense too
            Expense.updateMany(
                { user_id, payment_mode: oldValue },
                { $set: { payment_mode: newValue.trim() } }
            )
                .then(() =>
                    res.status(200).json({
                        message: "Payment Mode updated successfully",
                        payment_modes: payment_modes.map((payment_mode) => {
                            if (payment_mode === oldValue)
                                return newValue.trim();
                            return payment_mode;
                        }),
                    })
                )
                .catch(() =>
                    res.status(500).json({
                        message: "Error updating payment mode",
                    })
                );
        })
        .catch(() =>
            res.status(500).json({ message: "Error updating payment mode" })
        );
};
