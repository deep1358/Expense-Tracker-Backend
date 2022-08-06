const createUser = require("../controllers/auth/createUser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
				passReqToCallback: true,
			},
			function (_req, _accessToken, _refreshToken, profile, done) {
				// Create user if it doesn't exist
				createUser(profile, done);
			}
		)
	);
};
