const AuthMiddleware = require("../middlewares/auth");

const router = require("express").Router();

// Get user data from session
router.post("/user", require("../controllers/auth/getUser"));

// Logout
router.post("/logout", AuthMiddleware, require("../controllers/auth/logout"));

// Delete user
router.delete(
	"/user",
	AuthMiddleware,
	require("../controllers/auth/deleteUser")
);

module.exports = router;
