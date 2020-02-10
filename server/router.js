const authController = require("./controllers/auth.controller");
const accountsController = require("./controllers/accounts.controller");
const usersController = require("./controllers/users.controller");
const staticController = require("./controllers/static.controller");

const router = [
  authController,
  accountsController,
  usersController,
  staticController
];

module.exports = router;
