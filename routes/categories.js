const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth");

// Create Category
router.post(
	"/",
	AuthMiddleware,
	require("../controllers/categories/createCategory")
);

// Update Category
router.patch(
	"/",
	AuthMiddleware,
	require("../controllers/categories/updateCategory")
);

// Delete Category
router.delete(
	"/:category",
	AuthMiddleware,
	require("../controllers/categories/deleteCategory")
);

module.exports = router;
