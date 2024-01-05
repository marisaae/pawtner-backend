'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.changeColumn('DogBreeds', 'name', {
        type: Sequelize.STRING(50)
      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('DogBreeds', 'name', {
      type: Sequelize.STRING(30)
    });
  }
};
