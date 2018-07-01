const db = require("./../schemas/index");

module.exports = {
  createUser: (info, cb) => {
    db.users
      .create({
        userName: info.userName,
        email: info.email,
        password: info.password,
        name: info.name
      })
      .then(response => {
        cb(response);
      })
      .catch(error => {
        cb(error);
      });
  },
  findUser: (info, cb) => {
    db.users
      .findOne({ where: { userName: info.userName, password: info.password } })
      .then(project => {
        cb(project);
      })
      .catch(error => {
        cb(error);
      });
  },
  readGroup: (info, cb) => {
    db.groups
      .find({ where: {} })
      .then(response => {
        if (response !== null) cb("found it!");
        else cb("does not exist");
      })
      .catch(error => {
        cb(error);
      });
  }
};
