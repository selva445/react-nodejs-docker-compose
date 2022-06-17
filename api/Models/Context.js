const mongoose = require("mongoose");

const contextSchema = new mongoose.Schema(
  {
    id: String,
    apps: {
      type: Array,
      default: [],
    },
    user: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Context", contextSchema);
