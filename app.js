const express = require("express");
const mysql = require("mysql");
require("./routes/survey");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const surveyRoute = require("./routes/survey");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satya",
  database: "nec"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to Database nec");
});

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(surveyRoute);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

global.db = db;

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
