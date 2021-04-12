const express = require("express");
const bodyParser = require("body-parser");

const studentsRoute = require("./routes/students.routes");

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/students", studentsRoute);

app.listen(port, () => {
  console.log(`appleication start at ${port}`);
});
