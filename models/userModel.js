const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userRepository = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  yearOfBirth: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
  },
}, {timestamps: true});

userRepository.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userRepository);
