const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: [String], default: ["Unknown"] },
    description: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
