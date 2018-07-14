const db = require("./../../db/schemas/index");

module.exports = {
  createGroup: (info, cb) => {
    db.groups
      .create({
        groupName: info.groupName,
        type: info.groupType,
        users: info.users
      })
      .then(response => {
        cb(response);
      })
      .catch(error => {
        cb(error);
      });
  },

  groupData: (id, cb) => {
    db.groups.find({ where: { groupID: id } }).then(response => {
      cb(response);
    });
  },

  findGroup: (data, cb) => {
    db.groups.findOne({ where: { groupID: data.groupID } }).then(group => {
      cb(group);
    });
  }
};
