'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            id: 1,
            uid: "dfc81b5e-5db1-4a6d-9828-ba8bbc6b4c87",
            name: "test-valid",
            role: "admin",
            password_hash: "$2b$10$7zAjUK3Cd3g2l6EqaIOR5utWIt6ZQl1KhOSYjAddOx6ehd/YLuo6e",
            email: "valid@email.com",
            email_is_valid: true,
            email_validation_uid: "68c2ea9e-2abf-41a3-a355-7f0012816170",
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 2,
            uid: "145b74df-1091-41a5-b3f8-fcbc9d91ce0e",
            name: "test-invlid",
            role: "user",
            password_hash: "$2b$10$/ANIL0hoe5ILhx8nvoaac.WQXCdn5TkgTCdyUe1HZEX/ioy8ozSTO",
            email: "invalid@email.com",
            email_is_valid: false,
            email_validation_uid: "e583549d-bf93-41e3-b193-21f78757104e",
            created_at: new Date(),
            updated_at: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
