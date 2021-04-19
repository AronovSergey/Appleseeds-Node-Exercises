const express = require("express");
const router = express.Router();

const workersJson = require("./../jsons/workers.json");
let workers = workersJson.workers;

router.get("/", (req, res) => {
  return res.status(200).json({
    workers: workers,
  });
});

router.post("/", (req, res) => {
  const { name, id } = req.body;
  if (!name.split("").includes(" ")) {
    return res.status(200).send("Name must include first and last name");
  } else if (name.length < 6) {
    return res.status(200).send("Name length has to be bigger than 5");
  } else if (workers.map((worker) => worker.id).includes(id)) {
    return res.status(200).send("ID has to be unique");
  } else {
    workers.push({ id, name, isActive: false });
    return res.status(200).send("Worker has been add to DB");
  }
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  return res.status(200).json({
    worker: workers.filter((worker) => worker.id === id)[0],
  });
});

module.exports = router;
