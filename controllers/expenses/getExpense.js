const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

module.exports = (req, res) => {
	const { _id } = req.user;
	const { id } = req.params;

	// Check if user exists
	User.findById(_id)
		.then((userRes) => {
			if (userRes)
				Expense.findById(id)
					.then((expenses) => {
						res.status(200).json(expenses);
					})
					.catch((err) => {
						res.status(500).json({ message: err.message });
					});
			else res.status(404).json({ message: "User not found" });
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};
