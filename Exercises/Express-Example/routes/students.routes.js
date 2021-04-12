const express = require("express");
const router = express.Router();

const studentsJson = require("./../students.json");
let students = studentsJson.students;

router.get("/", (req, res) => {
  return res.status(200).json({ students: students });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  return res.status(200).json({
    student: students.filter((student) => student.id === id)[0],
  });
});

router.post("/", (req, res) => {
  const id = parseInt(students[students.length - 1].id) + 1;
  const { name, capsule } = req.body;
  students.push({ id, name, capsule });
  return res.status(200).json({ success: "student add to db" });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const capsule = req.body.capsule;
  const index = students.map((student) => student.id).indexOf(id);
  students[index].capsule = capsule;
  res.status(200).send("success");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  students = students.filter((student) => student.id !== id);
  res.status(200).send("success");
});

module.exports = router;
