const express = require("express");
const router = express.Router();

const workersJson = require("./../jsons/workers.json");
let workers = workersJson.workers;
const roomsJson = require("./../jsons/rooms.json");
let rooms = roomsJson.rooms.map((room) => ({ ...room, listOfWorkers: [] }));

router.get("/", (req, res) => {
  return res.status(200).json({
    rooms: rooms,
  });
});

router.post("/", (req, res) => {
  const { roomNumber, amount } = req.body;
  if (!roomNumber || !amount) {
    return res.status(200).json({
      success: false,
      message: "You have to enter room number && amount",
    });
  } else if (roomNumber < 0 || amount < 0) {
    return res.status(200).json({
      success: false,
      message: "Room number or amount is not a positve number",
    });
  } else {
    return res.status(200).json({ success: true });
  }
});

router.post("/:room/join/:worker", (req, res) => {
  const { room, worker } = req.params;
  const currentRoom = rooms.find(
    (current) => current.roomNumber === Number(room)
  );
  const currentWorker = workers.find(
    (current) => current.id === Number(worker)
  );

  if (!currentRoom || !currentWorker) {
    return res.status(200).json({
      success: false,
      message: "Room number or Work ID is undefined",
    });
  } else if (currentRoom < 1 || currentWorker < 1) {
    return res.status(200).json({
      success: false,
      message: "Room number or Work ID is not a positive number",
    });
  } else if (currentRoom.amount < 1) {
    return res.status(200).json({
      success: false,
      message: "This room does not have enough space",
    });
  } else if (!currentRoom.isActive || !currentWorker.isActive) {
    return res.status(200).json({
      success: false,
      message: "Worker Or Room is not active",
    });
  }

  currentRoom.listOfWorkers.push(currentWorker);
  return res.status(200).json({
    success: true,
    message: "Success",
  });
});

router.post("/:room/delete/:worker", (req, res) => {
  const { room, worker } = req.params;
  const currentRoom = rooms.find(
    (current) => current.roomNumber === Number(room)
  );
  const currentWorker = workers.find(
    (current) => current.id === Number(worker)
  );

  const isWorkerInThisRoom = currentRoom.listOfWorkers.find(
    (current) => current.id === Number(worker)
  );

  if (!currentRoom || !currentWorker) {
    return res.status(200).json({
      success: false,
      message: "Room number or Work ID is undefined",
    });
  } else if (currentRoom < 1 || currentWorker < 1) {
    return res.status(200).json({
      success: false,
      message: "Room number or Work ID is not a positive number",
    });
  } else if (!isWorkerInThisRoom) {
    return res.status(200).json({
      success: false,
      message: "Worker is not in room",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Success",
  });
});

module.exports = router;
