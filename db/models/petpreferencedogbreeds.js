'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetPreferenceDogBreeds = sequelize.define('PetPreferenceDogBreeds', {
    dogBreedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: "DogBreeds",
          key: "id"
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
    }, 
    petPreferenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: 'PetPreferences',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
    }
  }, {});
  PetPreferenceDogBreeds.associate = function(models) {
    // associations can be defined here
  };
  return PetPreferenceDogBreeds;
};