const router = require("express").Router();

// Monthly report email
router.get("/month", require("../controllers/email/monthlyReport"));

// Yearly report email
router.get("/year", require("../controllers/email/yearlyReport"));

module.exports = router;
