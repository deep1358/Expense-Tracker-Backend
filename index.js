/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const User = require("./db/models/User");
const Expense = require("./db/models/Expense");
const months = require("./utils/months");
const QuickChart = require("quickchart-js");

cron.schedule("* * 7 * *", () => {
	const transporter = nodemailer.createTransport({
		auth: {
			user: process.env.NODEMAILER_EMAIL_ID,
			pass: process.env.NODEMAILER_EMAIL_PASSWORD,
		},
		host: "smtp.gmail.com",
		port: 465,
		secure: true, // use SSL
	});

	const myChart = new QuickChart();
	myChart
		.setConfig({
			type: "bar",
			data: {
				labels: ["Food", "Travel", "Others"],
				datasets: [
					{ label: "Expense Amount (in Rs.)", data: [1245, 2445, 0] },
				],
				backgroundColor: QuickChart.getGradientFillHelper("horizontal", [
					"red",
					"green",
				]),
			},
		})
		.setWidth(300)
		.setHeight(200)
		.setBackgroundColor("transparent");

	const chartImageUrl = myChart.getUrl();

	const message = `Hello, please see the chart below:
						<br><br>
						<img src="${chartImageUrl}" />
					`;

	const messageOptions = {
		from: `Expense Tracker <${process.env.NODEMAILER_EMAIL_ID}>`,
		to: "deepshah1358@gmail.com",
		subject: "Expense Tracker Web - Monthly Report",
		html: message,
	};

	transporter.sendMail(messageOptions, function (error, info) {
		if (error) {
			console.log(error);
			// throw error;
		} else {
			console.log(`Email has successfully sent!`);
		}
	});
});

// App initialization
const app = express();

const PORT = process.env.PORT || 5000;

// Database connection
require("./db/index").connect();

// Middlewares
app.use(express.json());

// CORS
app.use(
	cors({
		origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
		methods: ["GET", "POST", "PATCH", "DELETE"],
		credentials: true,
	})
);

// Session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: !process.env.NODE_ENV === "production",
		saveUninitialized: !process.env.NODE_ENV === "production",
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 30,
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			secure: process.env.NODE_ENV === "production",
			httpOnly: !process.env.NODE_ENV === "production",
		},
	})
);

if (app.get("env") === "production") {
	app.set("trust proxy", 1); //necessary to set up a cookie in production
}

// Passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

// Routes
app.use("/api/auth", require("./routes/auth"));

app.use("/api/category", require("./routes/categories"));

app.use("/api/expense", require("./routes/expenses"));

app.use("/api", (_req, res) => {
	res.send("<h1>Welcome to the Expense Tracker API :)</h1>");
});

// Listen on port
app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);

	// const transporter = nodemailer.createTransport({
	// 	auth: {
	// 		user: "expensetrackerweb@gmail.com",
	// 		pass: "evwlkiyspunjxagn",
	// 	},
	// 	host: "smtp.gmail.com",
	// 	port: 465,
	// 	secure: true, // use SSL
	// });

	// const Users = {};
	// const users = await User.find({}, { userEmail: 1, _id: 1, categories: 1 });
	// const prevMonthDate = new Date();
	// prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);

	// const prevMonth = prevMonthDate.getMonth() + 1;

	// for (const user of users) {
	// 	Users[user.userEmail] = {};

	// 	for (const category of user.categories) {
	// 		const expenses = await Expense.find({
	// 			user_id: user._id,
	// 			category,
	// 			month: prevMonth,
	// 		});

	// 		const total = expenses.reduce((acc, curr) => {
	// 			return acc + curr.amount;
	// 		}, 0);

	// 		Users[user.userEmail][category] = total;
	// 	}
	// }

	// const myChart = new QuickChart();
	// myChart
	// 	.setConfig({
	// 		type: "bar",
	// 		data: {
	// 			labels: ["Food", "Travel", "Others"],
	// 			datasets: [
	// 				{ label: "Expense Amount (in Rs.)", data: [1245, 2445, 0] },
	// 			],
	// 			backgroundColor: QuickChart.getGradientFillHelper("horizontal", [
	// 				"red",
	// 				"green",
	// 			]),
	// 		},
	// 	})
	// 	.setWidth(300)
	// 	.setHeight(200)
	// 	.setBackgroundColor("transparent");

	// const chartImageUrl = myChart.getUrl();

	// const message = `Hello, please see the chart below:
	// 					<br><br>
	// 					<img src="${chartImageUrl}" />
	// 				`;

	// const messageOptions = {
	// 	from: "Expense Tracker <expensetrackerweb@gmail.com>",
	// 	to: "amenavrao@gmail.com",
	// 	subject: "Scheduled Email",
	// 	html: message,
	// `
	// 		<!DOCTYPE html>
	// 		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
	// 		<head>
	// 		<meta charset="UTF-8">
	// 		<meta name="viewport" content="width=device-width,initial-scale=1">
	// 		<meta name="x-apple-disable-message-reformatting">
	// 		<title></title>
	// 		<!--[if mso]>
	// 		<noscript>
	// 			<xml>
	// 			<o:OfficeDocumentSettings>
	// 				<o:PixelsPerInch>96</o:PixelsPerInch>
	// 			</o:OfficeDocumentSettings>
	// 			</xml>
	// 		</noscript>
	// 		<![endif]-->
	// 		<style>
	// 			table, td, div, h1, p {font-family: Arial, sans-serif;}
	// 		</style>
	// 		</head>
	// 		<body style="margin:0;padding:0;">
	// 			<table role="presentation" style="width:100%;border-collapse:collapse;border-spacing:0;background:#ffffff;">
	// 				<tr>
	// 					<th align="center" style="padding:10;">Category</th>
	// 					<th align="center" style="padding:10;">Amount</th>
	// 				</tr>
	// 				<tr>
	// 					<td align="center" style="padding:10;">
	// 						Food
	// 					</td>
	// 					<td align="center" style="padding:10;">
	// 						12,45,678 Rs.
	// 					</td>
	// 				</tr>
	// 				<tr>
	// 					<td align="center" style="padding:10;">
	// 						Travel
	// 					</td>
	// 					<td align="center" style="padding:10;">
	// 						0 Rs.
	// 					</td>
	// 				</tr>
	// 			</table>
	// 		</body>
	// 		</html>
	// 	`,
	// };

	// transporter.sendMail(messageOptions, function (error, info) {
	// 	if (error) {
	// 		console.log(error);
	// 		// throw error;
	// 	} else {
	// 		console.log(
	// 			`Email for ${
	// 				months[prevMonth - 1]
	// 			} ${new Date().getFullYear()} has successfully sent!`
	// 		);
	// 	}
	// });

	// Object.entries(Users).forEach(([email, res]) => {
	// 	messageOptions["to"] = email;
	// 	let html = "";
	// 	Object.entries(res).forEach(([category, total]) => {
	// 		html += `<p>${category}: ${total} Rs.</p>`;
	// 	});
	// 	// console.log(html);
	// 	messageOptions["html"] = html;

	// 	// transporter.sendMail(messageOptions, function (error, info) {
	// 	// 	if (error) {
	// 	// 		console.log(error);
	// 	// 		// throw error;
	// 	// 	} else {
	// 	// 		console.log(
	// 	// 			`Email for ${
	// 	// 				months[prevMonth - 1]
	// 	// 			} ${new Date().getFullYear()} has successfully sent to ${email}!`
	// 	// 		);
	// 	// 	}
	// 	// });
	// });
});
