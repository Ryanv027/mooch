const expenses = require("./../../db/models/expenses");

module.exports = app => {
  app.post("/api/addExpense", (req, res) => {
    const info = req.body;
    expenses.addExpense(info, response => {
      console.log(response);
    });
  });

  app.get("/api/groupExpenses", (req, res) => {
    const info = req.query;
    expenses.findExpenses(info, response => {
      res.send(response);
    });
  });
};
