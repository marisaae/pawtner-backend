'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSavedPets = sequelize.define('UserSavedPets', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE'
    },
    petApiId: {
      type: DataTypes.INTEGER,
    allowNull: false,
  }
  }, {});
  UserSavedPets.associate = function(models) {
    UserSavedPets.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user'
    })
  };
  return UserSavedPets;
};