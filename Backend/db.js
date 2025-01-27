const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, family:4 })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectToMongo;
