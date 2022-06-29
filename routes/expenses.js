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
	"/yearWiseExpense",
	Authmiddleware,
	require("../controllers/expenses/getYearWiseExpense")
);
router.get(
	"/year/:year",
	Authmiddleware,
	require("../controllers/expenses/getMonthWiseExpense")
);
router.get(
	"/year/:year/:month",
	Authmiddleware,
	require("../controllers/expenses/getDayWiseExpense")
);
router.get(
	"/:id",
	Authmiddleware,
	require("../controllers/expenses/getExpense")
);
router.get(
	"/viz/categoryWise",
	Authmiddleware,
	require("../controllers/expenses/getCategoryWiseExpenseForViz")
);

module.exports = router;
