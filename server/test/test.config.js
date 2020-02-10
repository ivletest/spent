const messages = require("../common/messages");
const errors = require("restify-errors");
const url = require("../server").server.url;

console.log(`Testing url: ${url}`);

// User data
const user = {
    username: "Test user.",
    email: `test${Math.floor(Math.random() * 89999) + 10000}@email.com`,
    password: "Testpass0",
    token: ""
}

module.exports = { url, messages, errors, user };