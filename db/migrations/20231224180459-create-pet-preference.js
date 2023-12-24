'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PetPreferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      petType: {
        type: Sequelize.ENUM,
        values: ['dog', 'cat'],
        allowNull: false
      },
      age: {
        type: Sequelize.STRING(50)
      },
      size: {
        type: Sequelize.STRING(50)
      },
      dogBreedId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'DogBreeds',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL'
      },
      catBreedId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CatBreeds',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL'
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
    return queryInterface.dropTable('PetPreferences');
  }
};