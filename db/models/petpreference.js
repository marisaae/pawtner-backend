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
  }, {});
  PetPreference.associate = function(models) {
    // associations can be defined here


  };
  return PetPreference;
};