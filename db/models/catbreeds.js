'use strict';

module.exports = (sequelize, DataTypes) => {
  const CatBreeds = sequelize.define('CatBreeds', {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  } 
  }, {});
  CatBreeds.associate = function(models) {
    // associations can be defined here
  };
  return CatBreeds;
};