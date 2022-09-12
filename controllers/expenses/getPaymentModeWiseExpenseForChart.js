const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const QueryObject = require("../../utils/QueryObject");

module.exports = (req, res) => {
	const { user_id } = req.headers;

	// Check if user exists
	User.findById(user_id)
		.then((userRes) => {
			if (userRes) {
				// Find expense based on query params
				Expense.aggregate([
					{
						$match: QueryObject(req.query, user_id),
					},
					{
						$group: {
							_id: "$payment_mode",
							amount: { $sum: "$amount" },
						},
					},
				])
					.then((expenses) => {
						// Change key _id to payment_mode
						expenses.forEach((expense) => {
							return delete Object.assign(expense, {
								["payment_mode"]: expense["_id"],
							})["_id"];
						});

						res.status(200).send(expenses);
					})
					.catch((err) =>
						res.status(400).json({ message: err.message || "Error" })
					);
			} else res.status(404).json({ message: "User not found" });
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};
