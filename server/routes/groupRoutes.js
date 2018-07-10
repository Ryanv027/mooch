//const path = require("path");
//const db = require("./../../db/schemas/index");
const groups = require("./../../db/models/groups");
const users = require("./../../db/models/users");

module.exports = app => {
  app.post("/api/createGroup", (req, res) => {
    const info = req.body;
    groups.createGroup(info, response => {
      res.send(response.dataValues.groupID);
    });
  });

  app.get("/api/getGroupData", (req, res) => {
    const groupID = req.query.groupID;
    groups.groupData(groupID, response => {
      const groupData = {
        groupName: response.dataValues.groupName,
        groupType: response.dataValues.type
      };
      res.send(groupData);
    });
  });

  app.get("/api/groupData", (req, res) => {
    const groupID = req.query;
    groups.findGroup(groupID, response => {
      if (response) {
        res.send(response);
      } else {
        res.send("group not found");
      }
    });
  });
};
