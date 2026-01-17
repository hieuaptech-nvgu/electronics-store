const mongoose = require("mongoose");
const attributeSchema = require("./attribute.schema");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, text: true },
    slug: { type: String, required: true, unique: true, index: true },

    // component | prebuilt
    type: {
      type: String,
      enum: ["component", "prebuilt"],
      default: "component",
      index: true,
    },

    // cpu | ram | gpu | psu | case...
    componentType: {
      type: String,
      required: function () {
        return this.type === "component";
      },
      index: true,
    },

    // Có biến thể hay không (RAM, SSD, GPU...)
    hasVariants: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Thuộc tính CHUNG (không đổi giữa các variant)
    // VD: socket CPU, ramType, formFactor
    baseAttributes: [attributeSchema],

    // CHỈ DÙNG CHO PREBUILT PC
    parts: [
      {
        componentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, default: 1 },
      },
    ],

    thumbnail: String,
    images: [String],

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index cho filter
productSchema.index({ componentType: 1, isActive: 1 });
productSchema.index({ "baseAttributes.k": 1, "baseAttributes.v": 1 });

module.exports = mongoose.model("Product", productSchema);
