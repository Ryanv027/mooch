const db = require("./../../db/schemas/index");

module.exports = {
  createArchivedExpense: info => {
    console.log("ARCHIVED MODEL", info);

    return db.archivedExpenses.create({
      groupID: info.groupID,
      mooches: info.mooches,
      moochesPaid: info.moochesPaid,
      shark: info.shark,
      amount: info.amount,
      description: info.description,
      expenseID: info.id
    });
  }
};

//  createExpense: (info, cb) => {
//     // console.log("AMOUNT", info.amount);
//     return db.expenses.create({
//       groupID: info.groupID,
//       mooches: info.users,
//       shark: info.userID,
//       amount: info.amount,
//       description: info.description
//     });
//   },
