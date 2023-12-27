'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PetPreferenceCatBreeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      catBreedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CatBreeds",
          key: "id"
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      },
      petPreferenceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'PetPreferences',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PetPreferenceCatBreeds');
  }
};