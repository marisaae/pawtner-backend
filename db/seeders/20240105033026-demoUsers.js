'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [{
        firstName: 'Demo',
        lastName: 'User',
        username: 'demo-user',
        email: 'demo@user.com',
        hashedPassword: bcrypt.hashSync('demoPassword'),
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        firstName: 'Dean',
        lastName: 'Will',
        username: 'dean-tortie',
        email: 'dean@user.com',
        hashedPassword: bcrypt.hashSync('deanPassword'),
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
      return queryInterface.bulkDelete('Users', {
        username: { [Op.in]: ['demo-user', 'dean-tortie'] }
      }, {});
  }
};
