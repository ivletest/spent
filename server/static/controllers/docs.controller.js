'use strict';
require("dotenv").config();
const router = require("../static.server").staticServer;
const restify = require("restify");

// GET DOCUMENTATION
router.get({ path: "/doc\/*", version: ['1.0.0'] },
    restify.plugins.serveStatic({
        directory: staticFolder,
        default: "index.html"
    }));

module.exports = router;