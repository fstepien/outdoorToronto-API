const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  content: { type: Number, required: true }
});

module.exports = mongoose.model("Location", locationSchema);
