'use strict';
module.exports = (sequelize, DataTypes) => {
  const DogBreeds = sequelize.define('DogBreeds', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    } 
  }, {});
  DogBreeds.associate = function(models) {
    DogBreeds.belongsToMany(models.PetPreference, {
      through: 'PetPreferenceDogBreeds',
      foreignKey: 'dogBreedId',
      otherKey: 'petPreferenceId'
    })
  };
  return DogBreeds;
};