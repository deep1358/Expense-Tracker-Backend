const User = require("../../db/models/User");

module.exports = (profile, done) => {
	// Check if user exists
	User.findOne({ userEmail: profile.emails[0].value }, (err, user) => {
		if (err) return done(err);

		// If user exists, return user
		if (user) return done(null, user);

		// If user does not exist, create one
		User.create({
			userName: profile.displayName,
			userEmail: profile.emails[0].value,
			userAvatar: profile.photos[0].value,
			categories: ["Food", "Transport", "Other"],
		})
			.then((user) => {
				return done(null, user);
			})
			.catch((err) => {
				return done(err);
			});
	});
};
