'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
return queryInterface.changeColumn('CatBreeds', 'name', {
  type: Sequelize.STRING,
  allowNull: true,
})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('CatBreeds', 'name', {
      type: Sequelize.STRING, 
      allowNull: false
    });
  }
};
