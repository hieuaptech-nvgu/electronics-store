const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

class Database {
  async connection() {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("mongoose connected");
    } catch (error) {
      console.error("mongoose connection failed", error.message);
    }
  }
}

module.exports = new Database();
