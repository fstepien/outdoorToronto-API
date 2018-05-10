const mongoose = require("mongoose");

const attractionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true
  },
  nameAttr: { type: String, required: true }
});

module.exports = mongoose.model("Attraction", attractionSchema);
