'use strict';
module.exports = (sequelize, DataTypes) => {
  const DogBreeds = sequelize.define('DogBreeds', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    } 
  }, {});
  DogBreeds.associate = function(models) {
    // associations can be defined here
  };
  return DogBreeds;
};