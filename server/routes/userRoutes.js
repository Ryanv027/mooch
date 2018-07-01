const path = require("path");
const db = require("./../../db/schemas/index");
const users = require("./../../db/models/users");

module.exports = app => {
  app.post("/api/users", (req, res) => {
    const info = req.body;
    users.createUser(info, response => {
      res.send(response);
    });
  });
  app.get("/api/users", (req, res) => {
    const info = req.query;
    users.findUser(info, response => {
      if (response) {
        res.send(response.dataValues.userID);
      }
    });
  });
};
