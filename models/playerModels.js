const mongoose = require("mongoose");

const playerRepository = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    isCaptain: {
      type: Boolean,
      required: true,
      default: false,
    },
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerRepository);
