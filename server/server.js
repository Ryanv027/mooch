const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cmd = require("node-cmd");
require("dotenv").config();
var db = require("./../db/schemas/index");

const PORT = process.env.PORT || 8080;
var DB_USER = process.env.RDS_USERNAME;
var DB_NAME = process.env.RDS_DB_NAME;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

require("./routes/userRoutes")(app);
require("./routes/groupRoutes")(app);
require("./routes/expensesRoutes")(app);

db.sequelize.sync({ force: false }).then(function() {
  cmd.run(`psql -U ${DB_USER} ${DB_NAME} < db/seeds.sql`);
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
