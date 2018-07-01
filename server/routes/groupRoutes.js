const path = require("path");
const db = require("./../../db/schemas/index");
const groups = require("./../../db/models/groups");

module.exports = app => {
  app.post("/api/createGroup", (req, res) => {
    const info = req.body;
    //console.log("CreateGROUP", info);
    groups.createGroup(info, response => {
      res.send(response);
    });
  });
};
