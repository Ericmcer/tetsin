const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");

//`mongodb://${dbUser}:${dbPwd}@localhost/union5`
const db = mongoose.connect(`mongodb://localhost/tetsin`, {
	useMongoClient: true
});
db.on("error", err => {
	console.log("Error establishing DB connection:", err);
});
db.on("open", success => {
	console.log("DB connection established");
});

/* Setup Application */
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

//replace with nginx eventually
app.use(express.static(__dirname + "/public"));
app.use("/api", routes);

const port = 3000;
app.listen(port, () => console.log("App started on", port));
