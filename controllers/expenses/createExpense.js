const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const categoryExists = require("./categoryExists");

module.exports = (req, res) => {
	const { _id } = req.user;
	const { category, amount, note } = req.body;
	const year = new Date().getFullYear();
	const month = new Date().getMonth() + 1;
	const day = new Date().getDate();

	User.findById(_id)
		.then((userRes) => {
			if (userRes) {
				if (categoryExists(userRes.categories, category))
					Expense.create({
						category,
						amount,
						note,
						user_id: _id,
						year,
						month,
						day,
					})
						.then((expense) => {
							res.status(200).json({
								message: "Expense created successfully",
								expense,
							});
						})
						.catch((err) => {
							res.status(500).json({ message: err.message });
						});
				else res.status(404).json({ message: "Category not found" });
			} else res.status(404).json({ message: "User not found" });
		})
		.catch((err) => res.status(500).json({ message: err.message }));
};
