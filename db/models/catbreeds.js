'use strict';

module.exports = (sequelize, DataTypes) => {
  const CatBreeds = sequelize.define('CatBreeds', {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
  } 
  }, {});
  CatBreeds.associate = function(models) {
    // associations can be defined here
  };
  return CatBreeds;
};