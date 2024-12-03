const Express = require("express");
const Router = Express.Router();

// Import controller functions for user operations
const { AddUser, GetUser, GetAllUsers, UpdateUser, DeleteUser } = require("../Controllers/User-Controller");

// Import middleware functions for logging and validation
const { LogRequestData, ValidateAddUser } = require("../Middlewares/User-Authentication");

// Route to add a new user
// Middleware `LogRequestData` logs request details
// Middleware `ValidateAddUser` validates the request body
Router.post("/user", LogRequestData, ValidateAddUser, AddUser);

// Route to update an existing user by ID
// Middleware `LogRequestData` logs request details
Router.put("/user/:id", LogRequestData, UpdateUser);

// Route to fetch a specific user by ID
// Middleware `LogRequestData` logs request details
Router.get("/users/:id", LogRequestData, GetUser);

// Route to fetch all users
// Middleware `LogRequestData` logs request details
Router.get("/users", LogRequestData, GetAllUsers);

// Route to delete a user by ID
// Middleware `LogRequestData` logs request details
Router.delete("/user/:id", LogRequestData, DeleteUser);

// Export the router so it can be used in the main application file
module.exports = Router;
