const User = require("../../db/models/User");
const Expense = require("../../db/models/Expense");

module.exports = (req, res) => {
	const { user_id } = req.headers;
	const { category } = req.params;

	User.updateOne({ _id: user_id }, { $pull: { categories: category } })
		.then(() => {
			// Delete all expenses of user of this category
			Expense.deleteMany({ user_id, category })
				.then(() => 
					res.status(200).json({
						message: "Category deleted successfully",
					})
				)
				.catch(() =>
					res.status(500).json({ message: "Error deleting category" })
				);
		})
		.catch(() => 
			res.status(500).json({ message: "Error deleting category" })
		);
};
