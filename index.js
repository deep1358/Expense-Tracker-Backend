const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

// App initialization

const app = express();

const PORT = process.env.PORT || 5000;
require("./db/index").connect();

// Middlewares

app.use(express.json());

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 15,
		},
	})
);

if (app.get("env") === "production") {
	// Serve secure cookies, requires HTTPS
	session.cookie.secure = true;
}

app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Routes

app.use("/auth", require("./routes/auth"));

app.use("/category", require("./routes/categories"));

app.use("/expense", require("./routes/expenses"));

app.use("/", (req, res) => {
	res.send("<h1>Welcome to the Expense Tracker API :)</h1>");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
