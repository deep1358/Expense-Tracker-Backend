const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
	const { categories } = req.user;
	const { oldValue, newValue } = req.body;

	// Check if category exists
	if (categoryExists(categories, newValue))
		return res.status(400).json({ message: "Category already exists" });
	User.updateOne(
		{ userEmail: req.user.userEmail, categories: oldValue },
		{ $set: { "categories.$": newValue } }
	)
		.then(() => {
			// update categories in expense too
			Expense.updateMany(
				{ category: oldValue },
				{ $set: { category: newValue } }
			)
				.then(() => {
					// Update newValue with oldValue in categories to session
					req.user.categories = req.user.categories.map((category) => {
						if (category === oldValue) return newValue;
						return category;
					});

					res.status(200).json({
						message: "Category updated successfully",
						categories: req.user.categories,
					});
				})
				.catch(() => {
					res.status(500).json({
						message: "Error updating category",
					});
				});
		})
		.catch(() => {
			res.status(500).json({ message: "Error updating category" });
		});
};
