const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");

module.exports = (req, res) => {
	const { user_id } = req.headers;
	const { payment_mode } = req.params;

	User.updateOne({ _id: user_id }, { $pull: { payment_modes: payment_mode } })
		.then(() => {
			// Delete all expenses of user of this payment_mode
			Expense.deleteMany({ user_id, payment_mode })
				.then(() => {
					res.status(200).json({
						message: "Payment Mode deleted successfully",
					});
				})
				.catch(() =>
					res.status(500).json({ message: "Error deleting Payment Mode" })
				);
		})
		.catch(() => {
			res.status(500).json({ message: "Error deleting Payment Mode" });
		});
};
