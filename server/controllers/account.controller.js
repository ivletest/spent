'use strict';
require("dotenv").config();
const router = require("../server").server;

const accountPath = "/:uid/account";
// CREATE ACCOUNT

router.post({ path: `${accountPath}/create`, version: ['1.0.0'] },
    async (request, response, next) => {

    });