const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");

module.exports = (req, res) => {
	const { userEmail, _id, categories } = req.user;
	const { category } = req.params;

	User.updateOne({ userEmail }, { $pull: { categories: category } })
		.then(() => {
			// Delete all expenses of user of this category
			Expense.deleteMany({ user_id: _id, category })
				.then(() => {
					// Update all expenses of user of this category to session
					req.user.categories = categories.filter(
						(category) => category !== req.params.category
					);

					res.status(200).json({
						message: "Category deleted successfully",
						categories: req.user.categories,
					});
				})
				.catch(() =>
					res.status(500).json({ message: "Error deleting category" })
				);
		})
		.catch(() => {
			res.status(500).json({ message: "Error deleting category" });
		});
};
