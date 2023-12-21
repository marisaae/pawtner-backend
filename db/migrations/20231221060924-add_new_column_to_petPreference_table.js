'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('PetPreferences', 'petType', {
      type: Sequelize.STRING
    })
  }
};
