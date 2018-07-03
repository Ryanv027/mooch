const path = require("path");
const db = require("./../../db/schemas/index");
const users = require("./../../db/models/users");
const bcrypt = require("bcryptjs");

module.exports = app => {
  app.post("/api/users", (req, res) => {
    const info = req.body;
    users.createUser(info, response => {
      res.send(response.dataValues.userID);
    });
  });

  app.get("/api/users", (req, res) => {
    const info = req.query;
    // console.log(info);
    users.findUser(info, response => {
      // console.log(response);
      const password = response.dataValues.password;
      console.log(password);
      console.log(info.password);
      bcrypt.compare(info.password, password, (error, respsonse) => {
        console.log(response);
        if (response) {
          const userData = {
            userID: response.dataValues.userID,
            groups: response.dataValues.groups
          };
          res.send(userData);
        }
      });
    });
  });

  app.get("/api/user/:user", (req, res) => {
    const info = req.params.user;
    users.verifyUser(info, response => {
      if (response) {
        res.send(response);
      } else {
        res.send("invalid");
      }
    });
  });

  app.put("/api/addGroupToUser", (req, res) => {
    const info = req.body;
    //console.log("ROUTES", info);
    users.addGroup(info);
    res.send("confirm");
  });
};
