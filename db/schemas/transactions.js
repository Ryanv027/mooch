module.exports = function(sequelize, DataTypes) {
  var transaction = sequelize.define("transaction", {
    // transactionID: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true
    // },
    userID: {
      type: DataTypes.STRING(50)
      // validate: {
      //   len: [2, 50],
      //   // isAlphanumeric: true,
      //   notNull: true
      // }
    },
    groupID: {
      type: DataTypes.STRING(50)
    },
    expenseID: {
      type: DataTypes.STRING(50)
      // validate: {
      //   isEmail: true,
      //   notNull: true
      // }
    },
    credit: {
      type: DataTypes.STRING(50)
    },
    debit: {
      type: DataTypes.STRING(50)
    }
  });

  return transaction;
};
