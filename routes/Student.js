const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.post("/", (req, res, next) => {
  const { nick, name, age, rank, email, password } = req.body;

  console.log("Searching for student");
  Student.findOne({ email: email }, function (err, student) {
    if (err) {
      return res.status(500).send(err);
    } else if (student) {
      return res.status(400).send("Student already exists");
    } else {
      Student.findOne({ nick: nick }, function (err, student) {
        if (err) {
          return res.status(500).send(err);
        } else if (student) {
          return res.status(400).send("Student already exists");
        } else {
          const student = new Student({
            nick,
            name,
            age,
            rank,
            email,
          });
          student.setPassword(password);
          student.save();
          return res.send("Student created");
        }
      });
    }
  });
});

module.exports = router;
