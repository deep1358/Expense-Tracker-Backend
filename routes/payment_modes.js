const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth");

// Create Payment Mode
router.post(
	"/",
	AuthMiddleware,
	require("../controllers/payment_modes/createPaymentMode")
);

// Update Payment
router.patch(
	"/",
	AuthMiddleware,
	require("../controllers/payment_modes/updatePaymentMode")
);

// Delete Payment
router.delete(
	"/:payment_mode",
	AuthMiddleware,
	require("../controllers/payment_modes/deletePaymentMode")
);

module.exports = router;
