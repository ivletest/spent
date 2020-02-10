require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { url, messages, errors, user } = require("./test.config");
const route = "/auth/logout";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("/POST auth/logout", () => {

    it("401 Unauthorized - invalid auth token", (done) => {
        testInvalidTokenCase(done)
    });

    it("204 No Content - user logged out", (done) => {
        testLogoutSuccess(done)
    });
});

function testErrorCase(response, status, error) {
    response.should.have.status(status);
    response.body.should.be.a("object");
    response.body.should.have.property("code");
    response.body.should.have.property("message");
    expect(response.body.code).to.equal(error.code);
    expect(response.body.message).to.equal(error.message);
}


function testInvalidTokenCase(done) {
    chai.request(url)
        .delete(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send()
        .end((error, response) => {
            testErrorCase(response, 401, new errors.UnauthorizedError(messages.unauthorized));
            done();
        });
}

function testLogoutSuccess(done) {
    chai.request(url)
        .delete(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('auth_token', user.token)
        .send()
        .end((error, response) => {
            response.should.have.status(204);
            response.body.should.be.a("object");
            done();
        });
}