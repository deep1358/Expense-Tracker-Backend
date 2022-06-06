module.exports = (categories, categoryName) =>
	categories.findIndex((category) => category === categoryName) !== -1;
