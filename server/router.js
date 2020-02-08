const authController = require("./controllers/auth.controller");
const accountController = require("./controllers/account.controller");
const staticController = require("./controllers/static.controller");

const router = [
  authController,
  accountController,
  staticController
];

module.exports = router;
