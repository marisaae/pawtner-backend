'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetPreference = sequelize.define('PetPreference', {
    petType: DataTypes.STRING,
    age: DataTypes.STRING,
    size: DataTypes.STRING,
    dogBreedId: DataTypes.INTEGER,
    catBreedId: DataTypes.INTEGER
  }, {});
  PetPreference.associate = function(models) {
    // associations can be defined here
  };
  return PetPreference;
};