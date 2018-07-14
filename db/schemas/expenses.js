module.exports = function(sequelize, DataTypes) {
  var expense = sequelize.define("expenses", {
    expenseID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    groupID: {
      type: DataTypes.STRING(50)
      // validate: {
      //   len: [2, 50],
      //   // isAlphanumeric: true,
      //   notNull: true
      // }
    },
    mooches: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
      // validate: {
      //   isEmail: true,
      //   notNull: true
      // }
    },
    shark: {
      type: DataTypes.STRING(50)
    },
    amount: {
      type: DataTypes.DECIMAL(30)
    },
    description: {
      type: DataTypes.STRING(100)
    }
  });

  return expense;
};
