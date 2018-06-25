module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("users", {
    userName: {
      type: DataTypes.STRING(50)
      // validate: {
      //   len: [2, 50],
      //   // isAlphanumeric: true,
      //   notNull: true
      // }
    },
    email: {
      type: DataTypes.STRING(30)
      // validate: {
      //   isEmail: true,
      //   notNull: true
      // }
    },
    password: {
      type: DataTypes.STRING(30)
    },
    name: {
      type: DataTypes.STRING(30)
    }
  });

  return user;
};
