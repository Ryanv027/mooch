const db = require("./../schemas/index");

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
  // findUser: (info, cb) => {
  //   db.users
  //     .findOne({ where: { userName: info.userName, password: info.password } })
  //     .then(project => {
  //       cb(project);
  //     })
  //     .catch(error => {
  //       cb(error);
  //     });
  // },
  // readGroup: (info, cb) => {
  //   db.groups
  //     .find({ where: {} })
  //     .then(response => {
  //       if (response !== null) cb("found it!");
  //       else cb("does not exist");
  //     })
  //     .catch(error => {
  //       cb(error);
  //     });
  // }
};
