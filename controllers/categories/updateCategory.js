const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
	const { categories, _id, userEmail } = req.user;
	const { oldValue, newValue } = req.body;

	// Check if category name contains only alphabets
	if (!/^[a-zA-Z]+$/.test(newValue))
		return res
			.status(400)
			.json({ message: "Category name must be alphabetic" });

	if (categoryExists(categories, newValue))
		// Check if category exists
		return res.status(400).json({ message: "Category already exists" });

	// Check if category name is too long
	if (newValue.length > 20)
		return res
			.status(400)
			.json({ message: "Maximum category name length must be of 20" });
	User.updateOne(
		{ userEmail, categories: oldValue },
		{ $set: { "categories.$": newValue } }
	)
		.then(() => {
			// update categories in expense too
			Expense.updateMany(
				{ user_id: _id, category: oldValue },
				{ $set: { category: newValue } }
			)
				.then(() => {
					// Update newValue with oldValue in categories to session
					req.user.categories = categories.map((category) => {
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
