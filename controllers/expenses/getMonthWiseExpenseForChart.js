const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const months = require("../../utils/months");
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
							_id: "$month",
							amount: { $sum: "$amount" },
						},
					},
				])
					.then((expenses) => {
						const monthsFromRes = [];

						// Change key _id to month
						expenses.forEach((expense) => {
							monthsFromRes.push(expense._id);
							return delete Object.assign(expense, {
								["month"]: expense["_id"],
							})["_id"];
						});

						// Add months with 0 amount if not present in response
						months.forEach((_month, index) => {
							if (!monthsFromRes.includes(index + 1)) {
								expenses.push({
									amount: 0,
									month: index + 1,
								});
							}
						});

						// Sort by month and Convert month number to month name
						expenses
							.sort((a, b) => a.month - b.month)
							.forEach((expense) => {
								expense.month = months[expense.month - 1];
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
