const mongoose = require("mongoose");
require('dotenv').config()

async function DBConnection() {
  const connectURL = process.env.MONGO_DB_CONNECTION_URI;

  const connection = mongoose.connect(connectURL);

  connection.then(
    () => {
      console.log("Connected to database");
    },
    (err) => {
      console.log(err);;
    }
  );
}

module.exports = DBConnection
