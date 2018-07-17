const db = require("./../../db/schemas/index");

module.exports = {
  initialTransaction: info => {
    return db.transaction.create({
      userID: info.shark,
      expenseID: info.expenseID,
      groupID: info.groupID,
      debit: 0,
      credit: info.amount
    });
  },
  readTransactions: groupID => {
    return db.transaction.findAll({ where: { groupID: groupID } });
  }
};
