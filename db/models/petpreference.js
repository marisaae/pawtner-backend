'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetPreference = sequelize.define('PetPreference', {
    petType: {
      type: DataTypes.ENUM,
      values: ['dog', 'cat'],
      allowNull: false
    },
    age: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE'
    }
  }, {});
  PetPreference.associate = function(models) {
    PetPreference.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user'
    });
    PetPreference.belongsToMany(models.DogBreeds, {
      through: 'PetPreferenceDogBreeds',
      foreignKey: 'petPreferenceId',
      otherKey: 'dogBreedId'
    });
    PetPreference.belongsToMany(models.CatBreeds, {
      through: 'PetPreferenceCatBreeds',
      foreignKey: 'petPreferenceId',
      otherKey: 'catBreedId'
    })


  };
  return PetPreference;
};