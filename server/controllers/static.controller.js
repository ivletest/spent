'use strict';
require("dotenv").config();
const router = require("../server").server;
const restify = require("restify");
const errors = require("restify-errors");

// GET DOCUMENTATION
router.get({ path: "/doc\/*", version: ['1.0.0'] },
    restify.plugins.serveStatic({
        directory: staticFolder,
        default: "index.html"
    }));

// 404 NOT FOUND FOR ALL ROUTES NOT IN USE
router.get("**", (request, response, next) =>
    next(new errors.NotFoundError("Nope.")));

module.exports = router;