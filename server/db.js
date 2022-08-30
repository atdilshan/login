const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://localhost:27017/reonff", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("MongoDB Connection Successfull");
  });

  connection.on("error", () => {
    console.log("MongoDB Connection Error");
  });
}

connectDB();

module.exports = mongoose;
