const User = require("../db/models/User");

module.exports = function (passport) {
	require("../strategies/google")(passport);

	passport.serializeUser((user, cb) => {
		cb(null, user._id);
	});
	passport.deserializeUser((id, cb) => {
		User.findById(id, (err, user) => {
			if (err) {
				return cb(err);
			}
			// console.log(user);
			cb(null, user);
		});
	});
};
