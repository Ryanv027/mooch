const db = require("./../schemas/index");

module.exports = {
  createUser: (info, cb) => {
    db.users
      .create({
        userName: info.userName,
        email: info.email,
        password: info.password,
        name: info.name,
        groups: info.groups
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
      .findOne({ where: { userName: info.userName } })
      .then(user => {
        cb(user);
      })
      .catch(error => {
        cb(error);
      });
  },

  findEmail: (info, cb) => {
    db.users
      .findOne({ where: { email: info.email } })
      .then(user => {
        cb(user);
      })
      .catch(error => {
        cb(error);
      });
  },

  groupUserData: (userID, cb) => {
    db.users
      .findOne({ where: { userID: userID } })
      .then(data => {
        cb(data);
      })
      .catch(error => {
        cb(error);
      });
  },

  addGroup: info => {
    //console.log(info);
    const groups = { groups: info.groups };
    const userID = info.userID;
    db.users
      .update(groups, { where: { userID: userID } })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log("ERROR", error);
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
