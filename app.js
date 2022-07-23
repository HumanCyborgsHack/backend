const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => console.log("connected to mongo"));

app.get("/", (req, res) => {
  res.send("Hello Poli-learning!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
