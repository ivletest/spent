const errorsController = require("./controllers/errors.controller");
const authController = require("./controllers/auth.controller");
const accountsController = require("./controllers/accounts.controller");
const usersController = require("./controllers/users.controller");

const router = [
  errorsController,
  authController,
  accountsController,
  usersController
];

module.exports = router;
