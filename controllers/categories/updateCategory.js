const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");
const categoryExists = require("../../utils/categoryExists");

module.exports = (req, res) => {
	const { user_id } = req.headers;
	const { oldValue, newValue, categories } = req.body;

	// Check if category name contains only alphabets
	if (!/^[a-zA-Z]([a-zA-Z _-]*([a-zA-Z]))?$/.test(newValue.trim()))
		return res
			.status(400)
			.json({ message: "Category name must be alphabetic" });

	if (categoryExists(categories, newValue.trim()))
		// Check if category exists
		return res.status(400).json({ message: "Category already exists" });

	// Check if category name is too long
	if (newValue.trim().length > 20)
		return res
			.status(400)
			.json({ message: "Maximum category name length must be of 20" });

	User.updateOne(
		{ _id: user_id, categories: oldValue },
		{ $set: { "categories.$": newValue.trim() } }
	)
		.then(() => {
			// update categories in expense too
			Expense.updateMany(
				{ user_id, category: oldValue },
				{ $set: { category: newValue.trim() } }
			)
				.then(() => 
					res.status(200).json({
						message: "Category updated successfully",
						categories: categories.map((category) => {
							if (category === oldValue) return newValue.trim();
							return category;
						}),
					})
				)
				.catch(() => 
					res.status(500).json({
						message: "Error updating category",
					})
				);
		})
		.catch(() => 
			res.status(500).json({ message: "Error updating category" })
		);
};
