const passport = require("passport");
const AuthMiddleware = require("../middlewares/auth");

const router = require("express").Router();

// Google authentication route (redirects to Google for authentication)
router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

//  Google authentication callback route (redirects to frontend)
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.FRONTEND_URL,
	})
);

// Get user data from session
router.get("/user", require("../controllers/auth/getUser"));

// Logout
router.post("/logout", AuthMiddleware, require("../controllers/auth/logout"));

// Delete user
router.delete(
	"/user",
	AuthMiddleware,
	require("../controllers/auth/deleteUser")
);

module.exports = router;
