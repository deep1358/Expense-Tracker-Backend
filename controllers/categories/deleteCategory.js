const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");

module.exports = (req, res) => {
	const { userEmail } = req.user;
	const { category } = req.params;

	User.updateOne({ userEmail }, { $pull: { categories: category } })
		.then(() => {
			Expense.deleteMany({ category })
				.then(() => {
					req.user.categories = req.user.categories.filter(
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
