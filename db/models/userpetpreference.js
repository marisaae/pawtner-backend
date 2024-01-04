'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPetPreference = sequelize.define('UserPetPreference', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "Users",
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
    },
    petPreferenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "PetPreferences",
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
    }
  }, {});
  UserPetPreference.associate = function(models) {
    // associations can be defined here
  };
  return UserPetPreference;
};