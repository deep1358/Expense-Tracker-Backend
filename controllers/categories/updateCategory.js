const User = require("../../db/models/User");

module.exports = (req, res) => {
	User.updateOne(
		{ userEmail: req.user.userEmail, categories: req.body.oldValue },
		{ $set: { "categories.$": req.body.newValue } }
	)
		.then(() => {
			res.status(200).json({ message: "Category updated successfully" });
		})
		.catch((err) => {
			res.status(500).json({ message: "Error updating category" });
		});
};
