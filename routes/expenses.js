const router = require("express").Router();
const Authmiddleware = require("../middlewares/auth");

// Get all expenses
router.get("/", Authmiddleware, require("../controllers/expenses/getAll"));

// Create expense
router.post(
	"/",
	Authmiddleware,
	require("../controllers/expenses/createExpense")
);

// Update expense
router.patch(
	"/",
	Authmiddleware,
	require("../controllers/expenses/updateExpense")
);

// Delete expense
router.delete(
	"/:id",
	Authmiddleware,
	require("../controllers/expenses/deleteExpense")
);

// Get expenses by year
router.get(
	"/year",
	Authmiddleware,
	require("../controllers/expenses/getYearWiseExpense")
);

// Get expenses by month
router.get(
	"/year/:year",
	Authmiddleware,
	require("../controllers/expenses/getMonthWiseExpense")
);

// Get expenses by day
router.get(
	"/year/:year/:month",
	Authmiddleware,
	require("../controllers/expenses/getDayWiseExpense")
);

// Get expenses for chart by category
router.get(
	"/chart/category",
	Authmiddleware,
	require("../controllers/expenses/getCategoryWiseExpenseForChart")
);

// Get expenses for chart by year
router.get(
	"/chart/year",
	Authmiddleware,
	require("../controllers/expenses/getYearWiseExpenseForChart")
);

// Get expenses for chart by month
router.get(
	"/chart/month",
	Authmiddleware,
	require("../controllers/expenses/getMonthWiseExpenseForChart")
);

// Get expenses for chart by day
router.get(
	"/chart/day",
	Authmiddleware,
	require("../controllers/expenses/getDayWiseExpenseForChart")
);

// Get expenses with specific id
router.get(
	"/:id",
	Authmiddleware,
	require("../controllers/expenses/getExpense")
);

module.exports = router;
