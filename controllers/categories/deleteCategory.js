const User = require("../../db/models/User");

module.exports = (req, res) => {
	User.updateOne(
		{ userEmail: req.user.userEmail },
		{ $pull: { categories: req.params.category } }
	)
		.then(() => {
			req.user.categories = req.user.categories.filter(
				(category) => category !== req.params.category
			);
			res.status(200).json({
				message: "Category deleted successfully",
				categories: req.user.categories,
			});
		})
		.catch(() => {
			res.status(500).json({ message: "Error deleting category" });
		});
};
