'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetPreference = sequelize.define('PetPreference', {
    userId: DataTypes.INTEGER,
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