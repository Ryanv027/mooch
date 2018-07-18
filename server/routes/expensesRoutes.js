const expenses = require("./../models/expenses");
const archivedExpenses = require("./../models/archivedExpenses");
const expensesController = require("./../controllers/expenses");

module.exports = app => {
  app.post("/api/createExpense", (req, res) => {
    const info = req.body;
    expensesController.createExpense(info, response => {
      console.log("create expense route", response);
      res.send(response);
    });
  });

  app.get("/api/groupExpenses", (req, res) => {
    const info = req.query;
    //console.log(info);
    expenses.findExpenses(info, response => {
      res.send(response);
    });
  });

  app.get("/api/singleExpenseData", (req, res) => {
    const expenseID = req.query.expenseID;
    expenses.findSingleExpense(expenseID).then(response => {
      res.send(response);
    });
  });

  app.delete("/api/deleteExpense", (req, res) => {
    const expenseID = req.query.id;
    const info = req.query;
    archivedExpenses.createArchivedExpense(info).then(response => {
      console.log(response);
    });
    expensesController.deleteExpense(expenseID, response => {
      res.send("confirm");
    });
  });

  app.put("/api/updateMooches", (req, res) => {
    const info = req.body;
    expenses.updateMooches(info);
    res.send("confirm");
  });
};
