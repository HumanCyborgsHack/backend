const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.post("/", (req, res) => {
  const { nick, name, age, rank, email, password } = req.body;
  const student = new Student({
    nick,
    name,
    age,
    rank,
    email,
  });
  student.setPassword(password);
  student.save();
  res.send("Student created");
});

module.exports = router;
