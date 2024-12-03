const User = require("../Models/User-Model");

// Controller to add a new user
exports.AddUser = async (Request, Response) => {
    try {
        // Extract validated user data from the request
        const { firstName, lastName, hobby } = Request.validatedUser;

        // Create a new user in the database
        const CreatedUser = await User.create({
            firstName,
            lastName,
            hobby
        });

        // Check if user creation was unsuccessful
        if (!CreatedUser) {
            return Response.status(500).json({
                status: false,
                error: "Something went wrong while registering new User...!"
            })
        }

        // Respond with success if user is created
        return Response.status(200).json({
            status: true,
            result: { id: CreatedUser._id },
            message: "User registered successfully...!"
        });
    } catch (error) {
         // Handle errors and respond with error message
        return Response.status(500).json({
            status: false,
            error: error?.message
        });
    }
}

// Controller to fetch a specific user by ID
exports.GetUser = async (Request, Response) => {
    try {
         // Extract user ID from request parameters
        const { id } = Request.params;

        // Find the user in the database by ID
        const AvailableUser = await User.findById(id);

        // Check if user is found
        if (AvailableUser) {
            return Response.status(200).json({
                status: true,
                result: AvailableUser
            });
        } else {
            // Respond with an error if user is not found
            return Response.status(404).json({
                status: false,
                error: "User not found"
            });
        }
    } catch (error) {
         // Handle errors and respond with error message
        return Response.status(500).json({
            status: false,
            error: error?.message
        });
    }
}

// Controller to fetch all users
exports.GetAllUsers = async (Request, Response) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Check if users exist
        if (users.length > 0) {
            return Response.status(200).json({
                status: true,
                result: users,
                message: "Users fetched successfully",
            });
        } else {
            // Respond with an error if no users are found
            return Response.status(404).json({
                status: false,
                error: "No users found",
            });
        }
    } catch (error) {
        // Handle errors and respond with error message
        return Response.status(500).json({
            status: false,
            error: error?.message
        });
    }
}

// Controller to update a user's details
exports.UpdateUser = async (Request, Response) => {
    try {
        // Extract user ID from request parameters and new data from the body
        const { id } = Request.params;
        const {
            firstName,
            lastName,
            hobby
        } = Request.body;
        console.log(id); // Debug log for the user ID

        // Find the user by ID and update their details
        const UpdatedUser = await User.findOneAndUpdate(
            { _id: id },
            { firstName, lastName, hobby },
            { new: true } // Return the updated document
        );

        // Check if the user was updated successfully
        if (UpdatedUser) {
            return Response.status(200).json({
                status: true,
                result: UpdatedUser,
                message: "User updated successfully",
            });
        } else {
            // Respond with an error if user is not found
            return Response.status(404).json({
                status: false,
                error: "User not found"
            });
        }
    } catch (error) {
        // Handle errors and respond with error message
        return Response.status(500).json({
            status: false,
            error: error?.message
        });
    }
}

// Controller to delete a user by ID
exports.DeleteUser = async (Request, Response) => {
    try {
        // Extract user ID from request parameters
        const { id } = Request.params;

        // Find the user by ID and delete them
        const DeletedUser = await User.findOneAndDelete({ _id: id });

        // Check if the user was deleted successfully
        if (DeletedUser) {
            return Response.status(200).json({
                status: true,
                message: "User Deleted successfully",
            });
        } else {
            // Respond with an error if user is not found
            return Response.status(404).json({
                status: false,
                error: "User not found"
            });
        }
    } catch (error) {
        return Response.status(500).json({
            status: false,
            error: error?.message
        });
    }
}