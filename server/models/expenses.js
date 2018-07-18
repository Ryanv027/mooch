const db = require("./../../db/schemas/index");

module.exports = {
  createExpense: (info, cb) => {
    // console.log("AMOUNT", info.amount);
    return db.expenses.create({
      groupID: info.groupID,
      mooches: info.users,
      moochesPaid: [],
      shark: info.userID,
      amount: info.amount,
      description: info.description
    });
  },

  findExpenses: (info, cb) => {
    db.expenses.findAll({ where: { groupID: info.groupID } }).then(response => {
      cb(response);
    });
  },

  findSingleExpense: expenseID => {
    return db.expenses.findOne({ where: { expenseID: expenseID } });
  },

  deleteExpense: (expenseID, cbController) => {
    db.expenses.destroy({ where: { expenseID: expenseID } }).then(response => {
      cbController(response);
    });
  },

  updateMooches: info => {
    const mooches = { mooches: info.mooches, moochesPaid: info.moochesPaid };
    const expenseID = info.expenseID;
    db.expenses
      .update(mooches, { where: { expenseID: expenseID } })
      .then(response => {
        console.log("RESPONSE", response);
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
