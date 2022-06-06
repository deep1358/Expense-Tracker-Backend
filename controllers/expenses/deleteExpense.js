const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

module.exports = (req, res) => {
	const { _id } = req.user;
	const { id } = req.params;

	User.findById(_id)
		.then((userRes) => {
			if (userRes)
				Expense.deleteOne({
					_id: id,
				})
					.then(() => {
						res.status(200).json({
							message: "Expense deleted successfully",
						});
					})
					.catch((err) => {
						res.status(500).json({ message: err.message });
					});
			else res.status(404).json({ message: "User not found" });
		})
		.catch((err) => res.status(500).json({ message: err.message }));
};

// function ObjectId() {
// 	const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
// 	const suffix = "xxxxxxxxxxxxxxxx"
// 		.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
// 		.toLowerCase();
// 	return `${timestamp}${suffix}`;
// }
