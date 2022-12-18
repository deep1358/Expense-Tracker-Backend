const router = require("express").Router();
const AuthMiddleware = require("../middlewares/auth");
const EmailAuthMiddleware = require("../middlewares/emailAuth");

// Monthly report email
router.get(
    "/month",
    EmailAuthMiddleware,
    require("../controllers/email/monthlyReport")
);

// Yearly report email
router.get(
    "/year",
    EmailAuthMiddleware,
    require("../controllers/email/yearlyReport")
);

// Change email subscription
router.patch(
    "/change",
    AuthMiddleware,
    require("../controllers/email/changeSubscription")
);

module.exports = router;
