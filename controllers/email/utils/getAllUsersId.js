const User = require("../../../db/models/User");

module.exports = () => {
    // Get all users Id and return them with promise
    return new Promise((resolve, reject) => {
        User.find({}, { _id: 1 }, (err, usersId) => {
            if (err) reject(`Something went wrong ${err}`);
            // If user exists, return user
            if (usersId) {
                resolve(usersId);
            }
        });
    });
};
