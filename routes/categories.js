const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth");

router.post(
	"/",
	AuthMiddleware,
	require("../controllers/categories/createCategory")
);

router.patch(
	"/",
	AuthMiddleware,
	require("../controllers/categories/updateCategory")
);

router.delete(
	"/:category",
	AuthMiddleware,
	require("../controllers/categories/deleteCategory")
);

module.exports = router;
