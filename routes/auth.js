const AuthMiddleware = require("../middlewares/auth");

const router = require("express").Router();

// Create user
router.post("/createUser", require("../controllers/auth/createUser"));

// Get user data from session
router.post("/user", require("../controllers/auth/getUser"));

// Delete user
router.delete(
    "/user",
    AuthMiddleware,
    require("../controllers/auth/deleteUser")
);

module.exports = router;
