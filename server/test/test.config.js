const messages = require("../common/messages");
const errors = require("restify-errors");

// Use hardcoded url for debugging
// const url = "localhost:3000";
const url = `${process.env.HOST}:${process.env.PORT}`;


// User data
const username = "Test user."
const email = `test${Math.floor(Math.random() * 89999) + 10000}@email.com`;
const password = "Testpass0";

module.exports = { url, messages, errors, username, email, password };