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
							_id: "$year",
							amount: { $sum: "$amount" },
						},
					},
					{
						$sort: { _id: 1 },
					},
				])
					.then((expenses) => {
						// Change key _id to year
						expenses.forEach((expense) => {
							return delete Object.assign(expense, {
								["year"]: expense["_id"],
							})["_id"];
						});

						return res.status(200).json(expenses);
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
