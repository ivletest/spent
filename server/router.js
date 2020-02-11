const errorsController = require("./api/controllers/errors.controller");
const authController = require("./api/controllers/auth.controller");
const accountsController = require("./api/controllers/accounts.controller");
const usersController = require("./api/controllers/users.controller");
const docsController = require("./static/controllers/docs.controller");

const router = [
  errorsController,
  authController,
  accountsController,
  usersController,
  docsController
];

module.exports = router;
