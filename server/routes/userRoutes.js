const path = require("path");
const db = require("./../../db/schemas/index");
const crud = require("./../../db/models/crud");

module.exports = app => {
  app.post("/api/users", (req, res) => {
    const info = req.body;
    crud.createUser(info, response => {
      res.send(response);
    });
  });
  app.get("/api/users", (req, res) => {
    const info = req.query;
    crud.readUser(info, response => {
      if (response === "found") {
        res.send("confirmed");
      } else {
        res.send("not found");
      }
    });
  });
};
