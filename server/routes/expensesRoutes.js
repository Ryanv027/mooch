const expenses = require("./../models/expenses");

module.exports = app => {
  app.post("/api/addExpense", (req, res) => {
    const info = req.body;
    expenses.addExpense(info, response => {
      res.send("confirm");
    });
  });

  app.get("/api/groupExpenses", (req, res) => {
    const info = req.query;
    //console.log(info);
    expenses.findExpenses(info, response => {
      res.send(response);
    });
  });
};
