const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");

module.exports = (req, res) => {
	User.updateOne(
		{ userEmail: req.user.userEmail, categories: req.body.oldValue },
		{ $set: { "categories.$": req.body.newValue } }
	)
		.then(() => {
			// update categories in expense too
			Expense.updateMany(
				{ category: req.body.oldValue },
				{ $set: { category: req.body.newValue } }
			)
				.then(() => {
					// Update newValue with oldValue in categories to session
					req.user.categories = req.user.categories.map((category) => {
						if (category === req.body.oldValue) return req.body.newValue;
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
