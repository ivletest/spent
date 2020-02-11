'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('user_accounts', [{
        created_at: new Date(),
        updated_at: new Date(),
        account_id: 1,
        user_id: 1
      },
      {
        created_at: new Date(),
        updated_at: new Date(),
        account_id: 2,
        user_id: 1
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('user_accounts', null, {});
  }
};
