const path = require("path");
const db = require("./../../db/schemas/index");
const users = require("./../../db/models/users");

module.exports = app => {
  app.post("/api/users", (req, res) => {
    const info = req.body;
    users.createUser(info, response => {
      res.send(response.dataValues.userID);
    });
  });

  app.get("/api/users", (req, res) => {
    const info = req.query;
    users.findUser(info, response => {
      const userData = {
        userID: response.dataValues.userID,
        groups: response.dataValues.groups
      };
      res.send(userData);
    });
    // const info = {
    //   userID: response.dataValues.userID,
    //   groups: response.dataValues.groups
    // };
    // if (response) {
    // res.send(info);
    //}
    //});
  });

  app.get("/api/:user", (req, res) => {
    const info = req.params.user;
    users.verifyUser(info, response => {
      if (response) {
        res.send(response.dataValues.userName);
      } else {
        res.send("invalid");
      }
    });
  });

  app.put("/api/addGroupToUser", (req, res) => {
    const info = req.body;
    users.addGroup(info);
  });
};
