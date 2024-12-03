const Mongoose = require("mongoose");

// Define the schema for a User document
const UserSchema = new Mongoose.Schema({
    // Field for the user's first name
    firstName: {
        type: String, // Data type is String
        required: [true, "First Name is required...!"] // Field is mandatory with a custom error message
    },
    // Field for the user's last name
    lastName: {
        type: String, // Data type is String
        required: [true, "Last Name is required...!"] // Field is mandatory with a custom error message
    },
    // Field for the user's hobby
    hobby: {
        type: String, // Data type is String
        required: [true, "Hobby is required...!"] // Field is mandatory with a custom error message
    }
});

// Export the model, specifying the collection name as "Users"
module.exports = Mongoose.model("User", UserSchema, "Users");
