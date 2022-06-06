const router = require("express").Router();
const Authmiddleware = require("../middlewares/auth");

router.get("/", Authmiddleware, require("../controllers/expenses/getAll"));
router.post(
	"/",
	Authmiddleware,
	require("../controllers/expenses/createExpense")
);
router.delete(
	"/:id",
	Authmiddleware,
	require("../controllers/expenses/deleteExpense")
);
router.patch(
	"/",
	Authmiddleware,
	require("../controllers/expenses/updateExpense")
);
router.get(
	"/:id",
	Authmiddleware,
	require("../controllers/expenses/getExpense")
);

module.exports = router;
