const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/iNotebook";

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
