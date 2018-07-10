const expenses = require("./../../db/models/expenses");

module.exports = app => {
  app.post("/api/addExpense", (req, res) => {
    console.log(req.body);
  });
};
