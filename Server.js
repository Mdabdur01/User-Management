require("dotenv").config();
const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const BodyParser = require("body-parser");
const Helmet = require("helmet");

const UserRouters = require("./Routes/User-Routes");

const App = Express();
App.use(Express.json({ limit: "16kb" }))
App.use(Express.urlencoded({ extended: true, limit: "16kb" }))

const CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || AllowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: process.env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || "Content-Type, Authorization",
    credentials: process.env.CORS_CREDENTIALS === "true",
    preflightContinue: process.env.CORS_PREFLIGHT_CONTINUE === "true",
    optionsSuccessStatus: parseInt(process.env.CORS_OPTION_SUCCESS_STATUS) || 200
};

App.use(Cors(CorsOptions));
App.use(Helmet());

App.use("/", UserRouters);

/********************* Connect To MongoDB *********************/
const URI = process.env.MONGODB_URL;
const PORT = process.env.PORT;

Mongoose.connect(URI).then(Success => {
    console.log("Connected to MongoDB");

    App.listen(PORT, () => {
        console.log(`Server is listening at Port : ${PORT}`)
    });
}).catch(Error => {
    console.log("Connection Error" + Error);
});