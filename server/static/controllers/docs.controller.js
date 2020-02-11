'use strict';
require("dotenv").config();
const router = require("../../server").server;
const restify = require("restify");

// GET DOCUMENTATION
router.get({ path: "/doc\/*", version: ['1.0.0'] },
    restify.plugins.serveStatic({
        directory: staticFolder,
        default: "index.html"
    }));

module.exports = router;