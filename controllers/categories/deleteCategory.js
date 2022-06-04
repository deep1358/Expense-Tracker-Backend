const User = require("../../db/models/User");

module.exports = (req, res) => {
	User.updateOne(
		{ userEmail: req.user.userEmail },
		{ $pull: { categories: req.params.category } }
	)
		.then(() => {
			res.status(200).json({ message: "Category deleted successfully" });
		})
		.catch((err) => {
			res.status(500).json({ message: "Error deleting category" });
		});
};
