const Rating = require("../models/rating");
const Card = require("../models/card");
const User = require("../models/user");

Rating.deleteMany({}, (err) => {
    if (err) {
        console.error("Error deleting Ratings objects:", err);
    } else {
        console.log("Ratings objects deleted successfully.");
    }
});

Card.deleteMany({}, (err) => {
    if (err) {
        console.error("Error deleting HearthstoneCard objects:", err);
    } else {
        console.log("HearthstoneCard objects deleted successfully.");
    }
});

User.deleteMany({}, (err) => {
    if (err) {
        console.error("Error deleting HearthstoneCard objects:", err);
    } else {
        console.log("User objects deleted successfully.");
    }
});

