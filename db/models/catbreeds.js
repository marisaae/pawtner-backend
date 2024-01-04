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
    CatBreeds.belongsToMany(models.PetPreference, {
      through: 'PetPreferenceCatBreeds',
      foreignKey: 'catBreedId',
      otherKey: 'petPreferenceId'
    })
  };
  return CatBreeds;
};