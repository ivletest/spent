'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('accounts', [{
            uid: "60ce244f-2397-477d-a61c-8df5a43bb251",
            is_private: false,
            balance: 200,
            currency: "mkd",
            created_at: new Date(),
            updated_at: new Date(),
            parent_account_uid: null
        },
        {
            uid: "ca5cb211-494d-4174-853f-e70a148c2b33",
            is_private: false,
            balance: 100,
            currency: "mkd",
            created_at: new Date(),
            updated_at: new Date(),
            parent_account_uid: "60ce244f-2397-477d-a61c-8df5a43bb251"
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('accounts', null, {});
    }
};
