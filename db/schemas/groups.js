module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define("groups", {
    groupID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    groupName: {
      type: DataTypes.STRING(50)
      // validate: {
      //   len: [2, 50],
      //   // isAlphanumeric: true,
      //   notNull: true
      // }
    },
    //type: {
    //type: DataTypes.STRING(30)
    // validate: {
    //   isEmail: true,
    //   notNull: true
    // }
    //},
    users: DataTypes.ARRAY(DataTypes.TEXT)
  });

  return group;
};
