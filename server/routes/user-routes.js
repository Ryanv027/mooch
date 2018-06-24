const path = require("path");
const db = require("./../../db/models/index");

module.exports = function(app) {
  app.post("/api/users", function(req, res) {
    console.log(req);
    console.log("req body", req.body);
  });
};
