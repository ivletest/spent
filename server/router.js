const authController = require("./controllers/auth.controller");
const accountController = require("./controllers/account.controller");

const router = [
  authController,
  accountController
];

module.exports = router;
