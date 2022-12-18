const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for email subscription
const emailSubscriptionSchema = new Schema({
    monthly: {
        type: Boolean,
        default: true,
    },
    yearly: {
        type: Boolean,
        default: true,
    },
});

// Schema for User
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
    },
    userAvatar: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    payment_modes: {
        type: [String],
        required: false,
    },
    email_subscription: {
        type: emailSubscriptionSchema,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
