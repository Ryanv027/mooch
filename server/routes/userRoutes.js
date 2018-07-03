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
    users.findUser(info, userResponse => {
      console.log("RESPONSE", userResponse);
      if (userResponse !== null) {
        const password = userResponse.dataValues.password;
        bcrypt.compare(info.password, password, (error, result) => {
          console.log(result);
          if (result) {
            const userData = {
              userID: userResponse.dataValues.userID,
              groups: userResponse.dataValues.groups
            };
            res.send(userData);
          } else {
            res.send("password invalid");
          }
        });
      } else {
        res.send("user not found");
      }
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

  app.get("/api/checkUsername", (req, res) => {
    const userName = req.query;
    users.findUser(userName, response => {
      if (response === null) {
        res.send("valid");
      } else {
        res.send("invalid");
      }
    });
  });

  app.get("/api/checkEmail", (req, res) => {
    const email = req.query;
    users.findEmail(email, response => {
      if (response === null) {
        res.send("valid");
      } else {
        res.send("invalid");
      }
    });
  });
};
