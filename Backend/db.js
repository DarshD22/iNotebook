const mongoose = require('mongoose');
require("dotenv").config();



const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectToMongo;
