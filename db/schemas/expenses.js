module.exports = function(sequelize, DataTypes) {
  var expense = sequelize.define("expenses", {
    groupID: {
      type: DataTypes.STRING(50)
      // validate: {
      //   len: [2, 50],
      //   // isAlphanumeric: true,
      //   notNull: true
      // }
    },
    mooch: {
      type: DataTypes.STRING(30)
      // validate: {
      //   isEmail: true,
      //   notNull: true
      // }
    },
    shark: {
      type: DataTypes.STRING(30)
    },
    amount: {
      type: DataTypes.STRING(30)
    },
    statesExpense: {
      type: DataTypes.STRING(30)
    }
  });

  return expense;
};
