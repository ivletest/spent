const messages = require("../common/messages");
const errors = require("restify-errors");
const url = require("../server").server.url;

console.log(`Testing url: ${url}`);

// User data
const username = "Test user."
const email = `test${Math.floor(Math.random() * 89999) + 10000}@email.com`;
const password = "Testpass0";

module.exports = { url, messages, errors, username, email, password };