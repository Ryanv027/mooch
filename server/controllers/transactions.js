const transactionsModel = require("./../models/transactions");
const calculateDebt = require("./../calculateDebt");

module.exports = {
  initialTransaction: info => {
    transactionsModel.initialTransaction(info).then(response => {
      calculateDebt.readTransactions(response.groupID);
    });
  }
};
