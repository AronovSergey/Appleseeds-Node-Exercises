const express = require("express");
const bodyParser = require("body-parser");

const workersRoute = require("./routes/workers.routes");
const roomsRoute = require("./routes/rooms.routes");

const port = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/workers", workersRoute);
app.use("/api/rooms", roomsRoute);

app.listen(port, () => {
  console.log("listening on port " + port);
});
