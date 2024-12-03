// Middleware to log request data
exports.LogRequestData = (Request, Response, Next) => {
    try {
        // Log the HTTP method and URL of the incoming request
        console.log(`${Request.method} ${Request.url}`);

        // Call the next middleware or route handler
        Next();
    } catch (error) {
        // Handle errors in case logging fails (rare scenario)
        return Response.status(500).json({
            status: false,
            error: error?.message
        });
    }
}


// Middleware to validate user input for adding a new user
exports.ValidateAddUser = (Request, Response, Next) => {
    try {
        const {
            // Extract user details from the request body
            firstName,
            lastName,
            hobby
        } = Request.body;

        // Check if the firstName is provided, otherwise return an error response
        if (!firstName) {
            return Response.status(400).json({
                status: false,
                error: "Please provide first name"
            })
        }

        // Check if the lastName is provided, otherwise return an error response
        if (!lastName) {
            return Response.status(400).json({
                status: false,
                error: "Please provide last name"
            })
        }

        // Check if the hobby is provided, otherwise return an error response
        if (!hobby) {
            return Response.status(400).json({
                status: false,
                error: "Please provide hobby"
            })
        }

        // Attach the validated user data to the request object for use in downstream handlers
        Request.validatedUser = { firstName, lastName, hobby };

        // Call the next middleware or route handler
        Next();
    } catch (error) {
        // Handle errors and respond with an error message
        return Response.status(500).json({
            status: false,
            error: error?.message
        });
    }
}