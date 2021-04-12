const http = require("http");
const url = require("url");
const qs = require("querystring");
const studentsJson = require("./students.json");

const port = 8001;
const students = studentsJson.students;

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true).query;

  if (req.method === "GET") {
    if (req.url.includes("students") && q.id) {
      res.write(
        JSON.stringify(students.filter((student) => student.id === q.id))
      );
    } else if (req.url.includes("students") && q.name) {
      res.write(
        JSON.stringify(students.filter((student) => student.name === q.name))
      );
    } else if (req.url.includes("students") && q.capsule) {
      res.write(
        JSON.stringify(
          students.filter((student) => student.capsule === q.capsule)
        )
      );
    } else if (req.url.includes("students")) {
      res.write(JSON.stringify(students));
    }
  }

  res.end();
});

server.listen(port, () => {
  console.log("Server run at " + port);
});
