'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetPreferenceDogBreeds = sequelize.define('PetPreferenceDogBreeds', {
    dogBreedId: DataTypes.INTEGER,
    petPreferenceId: DataTypes.INTEGER
  }, {});
  PetPreferenceDogBreeds.associate = function(models) {
    // associations can be defined here
  };
  return PetPreferenceDogBreeds;
};