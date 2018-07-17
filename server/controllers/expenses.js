const expenses = require("./../models/expenses");
const transactions = require("./../controllers/transactions");

module.exports = {
  createExpense: (info, cb) => {
    expenses.createExpense(info).then(response => {
      cb(response.dataValues.expenseID);
      //console.log(response);
      const data = {
        expenseID: response.dataValues.expenseID,
        shark: response.dataValues.shark,
        amount: response.dataValues.amount,
        groupID: info.groupID
      };
      //transactions.initialTransaction(data);
    });
  },
  deleteExpense: (expenseID, cbRouter) => {
    expenses.deleteExpense(expenseID, response => {
      cbRouter(response);
    });
  }
};
