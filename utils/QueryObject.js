const ObjectId = require("mongoose").Types.ObjectId;

const QueryObject = (query, user_id) => {
	const queryParams = Object.entries(query)
		.filter(([_key, value]) => value !== "All")
		.reduce((acc, el) => {
			return [
				...acc,
				el[0] === "payment_mode" && el[1] === "Other"
					? {
							[el[0]]: { $regex: "Other" },
					  }
					: { [el[0]]: isNaN(el[1]) ? el[1] : parseInt(el[1]) },
			];
		}, []);

	const queryObject = { user_id: new ObjectId(user_id) };

	// Add query params to query object
	if (queryParams.length) queryObject["$and"] = queryParams;

	return queryObject;
};

module.exports = QueryObject;
