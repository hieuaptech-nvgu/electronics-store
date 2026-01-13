const express = require("express");
const app = express();
const database = require("./config/db");

//init middleware
app.use(express.json())

//connect database
database.connection();

//init routers
app.use("/api", require("./modules/user/user.route"));
app.use("/api", require("./modules/auth/auth.route"));

module.exports = app;