'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPetPreference = sequelize.define('UserPetPreference', {
    userId: DataTypes.INTEGER,
    petPreferenceId: DataTypes.INTEGER
  }, {});
  UserPetPreference.associate = function(models) {
    // associations can be defined here
  };
  return UserPetPreference;
};