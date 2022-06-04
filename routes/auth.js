const passport = require("passport");
const AuthMiddleware = require("../middlewares/auth");

const router = require("express").Router();

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.FRONTEND_URL,
		// failureRedirect: process.env.FRONTEND_URL,
	})
);

router.get("/user", require("../controllers/auth/getUser"));

router.post("/logout", AuthMiddleware, require("../controllers/auth/logout"));

router.delete(
	"/user",
	AuthMiddleware,
	require("../controllers/auth/deleteUser")
);

module.exports = router;
