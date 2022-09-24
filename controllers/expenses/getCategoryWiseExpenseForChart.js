const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const QueryObject = require("../../utils/QueryObject");

module.exports = (req, res) => {
	const { user_id } = req.headers;

	// Check if user exists
	User.findById(user_id, { categories: 1 })
		.then((userRes) => {
			if (userRes) {
				let { categories } = userRes;

				// Find expense based on query params
				Expense.aggregate([
					{
						$match: QueryObject(req.query, user_id),
					},
					{
						$group: {
							_id: "$category",
							amount: { $sum: "$amount" },
						},
					},
				])
					.then((expenses) => {
						// Change key _id to category and add category name to categoriesFromRes
						expenses.forEach((expense) => {
							return delete Object.assign(expense, {
								["category"]: expense["_id"],
							})["_id"];
						});

						return res.status(200).send(expenses);
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
