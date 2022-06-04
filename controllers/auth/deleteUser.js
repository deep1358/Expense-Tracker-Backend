const User = require("../../db/models/User");

module.exports = (req, res) => {
	User.deleteOne({ userEmail: req.body.userEmail }, (err, result) => {
		if (err) {
			res.status(500).json({ message: err });
		} else {
			res.clearCookie("connect.sid");
			req.session.destroy((err) => {
				if (err) return res.status(500).json({ message: err });
				return res
					.status(200)
					.json({ message: "User deleted successfully" });
			});
		}
	});
};
