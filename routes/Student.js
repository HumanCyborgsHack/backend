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

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  Student.findOne({ email: email }, function (err, student) {
    if (err) {
      return res.status(500).send(err);
    } else if (!student) {
      return res.status(400).send("Student does not exist");
    } else {
      if (student.validPassword(password)) {
        return res.send("Student logged in");
      } else {
        return res.status(400).send("Wrong password");
      }
    }
  });
});

module.exports = router;
