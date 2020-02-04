const restify = require("restify");
const assert = require("assert");
const { server, port } = require("../server");
const router = require("../router");

before((done) => {
    server.listen(port, (router) => {
        console.log(`server test listens to port: ${port}`);
    });

    done();
});