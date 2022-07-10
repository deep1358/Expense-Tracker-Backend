const daysOfMonths = require("./daysOfMonths");
const leapYear = require("./leapYear");

const getMonthWiseDays = (month, year) => {
	let days = [],
		daysInMonth = daysOfMonths[month - 1];
	if (leapYear(year) && month === "2") daysInMonth = 29;
	for (let i = 1; i <= daysInMonth; i++) days.push(i);
	return days;
};

module.exports = getMonthWiseDays;
