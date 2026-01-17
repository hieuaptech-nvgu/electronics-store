const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema(
  {
    k: { type: String, required: true }, // socket, wattage, capacity...
    v: { type: mongoose.Schema.Types.Mixed, required: true }, // 1700, 650, 16...
    u: { type: String }, // W, GB, MHz (optional)
  },
  { _id: false }
);

module.exports = attributeSchema;
