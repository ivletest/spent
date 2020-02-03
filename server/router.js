const authController = require("./controllers/auth.controller");
const accountController = require("./controllers/account.controller");
const docsController = require("./controllers/docs.controller");

const router = [
  authController,
  accountController,
  docsController
];

module.exports = router;
