'use strict';
module.exports = (sequelize, DataTypes) => {
  const DogBreeds = sequelize.define('DogBreeds', {
    name: DataTypes.STRING
  }, {});
  DogBreeds.associate = function(models) {
    // associations can be defined here
  };
  return DogBreeds;
};