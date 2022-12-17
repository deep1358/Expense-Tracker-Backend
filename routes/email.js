const router = require("express").Router();

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

module.exports = router;
