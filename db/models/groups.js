const db = require("./../schemas/index");

module.exports = {
  createGroup: (info, cb) => {
    db.groups
      .create({
        groupName: info.groupName,
        type: info.groupType
      })
      .then(response => {
        cb(response);
      })
      .catch(error => {
        cb(error);
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
