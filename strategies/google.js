const createUser = require("../controllers/auth/createUser");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID:
					"972440077404-de6nj6vnagerim1dn4am47ra97tnf8qq.apps.googleusercontent.com",
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
				passReqToCallback: true,
			},
			function (req, accessToken, refreshToken, profile, done) {
				createUser(profile, done);
			}
		)
	);
};
