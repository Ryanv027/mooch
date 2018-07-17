const transactionsModel = require("./models/transactions");

module.exports = {
  readTransactions: groupID => {
    // console.log("HIT THE DAMN TRANSACTION");
    transactionsModel.readTransactions(groupID).then(data => {
      calculate(data);
    });
  },
  calculate: data => {
    data.map(user => {});
  }
};
