'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CatBreeds', [
      { name: 'Abyssinian', createdAt: new Date(), updatedAt: new Date() },
      { name: 'American Bobtail', createdAt: new Date(), updatedAt: new Date() },
      { name: 'American Curl', createdAt: new Date(), updatedAt: new Date() },
      { name: 'American Shorthair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'American Wirehair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Balinese', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bengal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Birman', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bombay', createdAt: new Date(), updatedAt: new Date() },
      { name: 'British Shorthair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Burmese', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Burmilla', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Calico', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chartreux', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chausie', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cornish Rex', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cymric', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Devon Rex', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Domestic Long Hair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Domestic Medium Hair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Domestic Shorthair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Egyptian Mau', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Exotic Shorthair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Havana', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Himalayan', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Japanese Bobtail', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Javanese', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Korat', createdAt: new Date(), updatedAt: new Date() },
      { name: 'LaPerm', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Maine Coon', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Manx', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Munchkin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Nebelung', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Norwegian Forest Cat', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ocicat', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Oriental Shorthair', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Persian', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pixiebob', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ragamuffin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ragdoll', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Russian Blue', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Scottish Fold', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Selkirk Rex', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Siamese', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Siberian', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Singapura', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Snowshoe', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Somali', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sphynx / Hairless Cat', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tabby', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tonkinese', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tortoiseshell', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Toyger', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Turkish Angora', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Turkish Van', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tuxedo', createdAt: new Date(), updatedAt: new Date() },
      { name: 'York Chocolate', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CatBreeds', null, {});

  }
};
