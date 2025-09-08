const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: String, default: "general" },
    image: { type: String, default: "" },
    stock: { type: Number, default: 999 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
