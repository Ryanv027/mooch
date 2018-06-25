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
        console.log(project.dataValues);
        if (project.dataValues !== null) {
          cb("found");
        }
      })
      .catch(error => {
        cb(error);
      });
  }
};
