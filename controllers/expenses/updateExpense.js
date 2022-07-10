const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
	const { category, amount, note, _id } = req.body;

	// Check if user exists
	User.findById(req.user._id)
		.then((userRes) => {
			if (userRes) {
				// Check if category exists
				if (categoryExists(userRes.categories, category))
					Expense.findByIdAndUpdate(_id, {
						category,
						amount,
						note,
					})
						.then(() => {
							res.status(200).json({
								message: "Expense updated successfully",
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
