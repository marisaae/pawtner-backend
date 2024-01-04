'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetPreferenceCatBreeds = sequelize.define('PetPreferenceCatBreeds', {
    catBreedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CatBreeds',
        key: 'id',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE',
    },
    petPreferenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: 'PetPreferences',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
    } 
  }, {});
  PetPreferenceCatBreeds.associate = function(models) {
    // associations can be defined here
  };
  return PetPreferenceCatBreeds;
};