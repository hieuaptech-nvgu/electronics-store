const express = require("express");
const app = express();
const database = require("./config/db");

//init middleware
app.use(express.json())

//connect database
database.connection();


app.use("/api", require("./modules/user/user.route"));

module.exports = app;