'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    bio: DataTypes.TEXT,
    PetPreferenceId: DataTypes.INTEGER
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};