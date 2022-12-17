const User = require("../../../db/models/User");

module.exports = () => {
    // Get all users Id, email and return them with promise
    return new Promise((resolve, reject) => {
        User.find({}, { userEmail: 1 }, (err, users) => {
            if (err) reject(`Something went wrong ${err}`);
            // If user exists, return user
            if (users) {
                resolve(users);
            }
        });
    });
};
