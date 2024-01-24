const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    goal: {
      type: String,
      required: [true, "Please add a text value"],
    },
    msg: {
      type: String,
      required: [true, "Please add a text value "],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
