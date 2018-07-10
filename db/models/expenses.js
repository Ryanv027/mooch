const db = require("./../schemas/index");

module.exports = {
  addExpense: (info, cb) => {
    db.expenses
      .create({
        groupID: info.groupID,
        mooches: info.users,
        shark: info.userID,
        amount: info.amount,
        description: info.description
      })
      .then(response => {
        cb(response);
      })
      .catch(error => {
        console.log(error);
      });
  },
  findExpenses: (info, cb) => {
    db.expenses.findAll({ where: { groupID: info.groupID } }).then(response => {
      cb(response);
    });
  }
};

// createUser: (info, cb) => {
//   db.users
//     .create({
//       userName: info.userName,
//       email: info.email,
//       password: info.password,
//       name: info.name,
//       groups: info.groups
//     })
//     .then(response => {
//       cb(response);
//     })
//     .catch(error => {
//       cb(error);
//     });
// },
