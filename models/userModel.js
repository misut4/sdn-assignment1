const mongoose = require("mongoose");

const userRepository = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  yearOfBirth: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("User", userRepository);
