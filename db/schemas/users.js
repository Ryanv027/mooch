module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("users", {
    userID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50],
        isAlphanumeric: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255],
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    groups: DataTypes.ARRAY(DataTypes.TEXT)
  });

  return user;
};
