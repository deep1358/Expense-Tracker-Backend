const Expense = require("../../db/models/Expense");
const User = require("../../db/models/User");

module.exports = (req, res) => {
	const { userEmail, _id } = req.user;

	// Delete User
	User.deleteOne({ userEmail }, (err) => {
		if (err) {
			res.status(500).json({ message: err });
		} else {
			// Delete all expenses of user
			Expense.deleteMany({ user_id: _id })
				.then(() => {
					// Destroy session
					res.clearCookie("connect.sid");
					req.session.destroy((err) => {
						if (err) return res.status(500).json({ message: err });
						return res
							.status(200)
							.json({ message: "User deleted successfully" });
					});
				})
				.catch((err) => res.status(500).json({ message: err }));
		}
	});
};
