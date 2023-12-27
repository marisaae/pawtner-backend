'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetPreferenceCatBreeds = sequelize.define('PetPreferenceCatBreeds', {
    catBreedId: DataTypes.INTEGER,
    petPreferenceId: DataTypes.INTEGER
  }, {});
  PetPreferenceCatBreeds.associate = function(models) {
    // associations can be defined here
  };
  return PetPreferenceCatBreeds;
};