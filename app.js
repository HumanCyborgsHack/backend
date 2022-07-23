const Student = require("./models/Student");
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const port = 3000;

const student = require("./routes/Student");

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => console.log("connected to mongo"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Poli-learning!");
});

app.use("/student", student);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
