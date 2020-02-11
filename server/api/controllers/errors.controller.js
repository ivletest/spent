'use strict';
require("dotenv").config();
const router = require("../api.server").server;

// 404 NOT FOUND FOR ALL ROUTES NOT IN USE
router.get("**", (request, response, next) =>
    next(new errors.NotFoundError("Nope.")));