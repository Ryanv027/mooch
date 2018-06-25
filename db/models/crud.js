const db = require("./../schemas/index");

module.exports = {
  create: (info, cb) => {
    db.users
      .create({
        userName: info.userName,
        email: info.email,
        password: info.password,
        name: info.name
      })
      .then(() => {
        cb("confirmed");
      })
      .catch(error => {
        cb(error);
      });
  },
  read: (info, cb) => {
    db.users
      .findOne({ where: { userName: info.userName, password: info.password } })
      .then(project => {
        if (project !== null) {
          cb("found");
        } else {
          cb("Not Found");
        }
      })
      .catch(error => {
        cb(error);
      });
  }
};
