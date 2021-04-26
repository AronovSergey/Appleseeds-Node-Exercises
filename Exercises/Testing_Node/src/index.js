const app = require("./app");

const port = process.env.PORT;

//Connected to server
app.listen(port, () => {
	console.log("Server listening on port " + port);
});
