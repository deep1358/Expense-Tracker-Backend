const User = require("../db/models/User");

module.exports = function (passport) {
	require("../strategies/google")(passport);

	// Serialize user for session means that the given user object will be stored in the session
	passport.serializeUser((user, cb) => {
		// Store user id in session
		cb(null, user._id);
	});

	// Deserialize user for session means that the given user object will be retrieved from the session
	passport.deserializeUser((id, cb) => {
		// Find user by id taken from session
		User.findById(id, (err, user) => {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};
