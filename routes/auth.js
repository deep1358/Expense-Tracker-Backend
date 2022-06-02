const router = require("express").Router();

router.get("/google", (req, res) => {
	res.send("google");
});

module.exports = router;
