const express = require("express");
const app = express();
const database = require("./config/db");
require("./config/redis");
const {handleError} = require("./middlewares/error.middleware");

//init middleware
app.use(express.json())

//connect database
database.connection();

//init routers
app.use("/api/user", require("./modules/user/user.route"));
app.use("/api/auth", require("./modules/auth/auth.route"));
app.use("/api/category", require("./modules/category/category.router"));

//handle error
app.use(handleError);

module.exports = app;