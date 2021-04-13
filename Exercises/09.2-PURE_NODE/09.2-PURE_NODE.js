const http = require("http");
const fs = require("fs");
const path = require("path");

const studentsJson = require("./students.json");

const directoryPath = path.join(__dirname, "./");
console.log(directoryPath);

const students = studentsJson.students;

const port = 8000;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/row-html") {
      res.write("<h1>Queen Shir</h1>");
      res.end();
    } else if (req.url === "/users") {
      res.write(JSON.stringify(students));
      res.end();
    } else if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile(directoryPath + "index.html", null, function (error, data) {
        if (error) {
          res.writeHead(404);
          res.write("File not found!");
        } else {
          res.write(data);
        }
        res.end();
      });
    }
  }
});

server.listen(port, () => {
  console.log("Server run at " + port);
});
