require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { url, messages, errors, username, email, password } = require("../test.config");
const route = "/auth/login";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

let token = "";

describe("/POST auth/login", () => {

    it("400 Bad Request - email is invalid", (done) => {
        testInvalidInputDataCase(done, "invalidEmail", password);
    });

    it("400 Bad Request - password is invalid", (done) => {
        testInvalidInputDataCase(done, email, null);
    });

    it("401 Unauthorized - user does not exist", (done) => {
        testInvalidCredentialsCase(done, `nonexistent${email}`, password)
    });

    it("401 Unauthorized - wrong password", (done) => {
        testInvalidCredentialsCase(done, email, "WrongPass401")
    });

    it("200 OK - user logged in", (done) => {
        testLoginSuccess(done, email, password)
    });
});

function testInvalidInputDataCase(done, email, password) {
    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email, password })
        .end((error, response) => {
            testErrorCase(response, 400, new errors.BadRequestError(messages.invalidInputData));
            done();
        });
}

function testInvalidCredentialsCase(done, email, password) {
    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email, password })
        .end((error, response) => {
            testErrorCase(response, 401, new errors.UnauthorizedError(messages.invalidCredentials));
            done();
        });
}

function testErrorCase(response, status, error) {
    response.should.have.status(status);
    response.body.should.be.a("object");
    response.body.should.have.property("code");
    response.body.should.have.property("message");
    expect(response.body.code).to.equal(error.code);
    expect(response.body.message).to.equal(error.message);
}

function testLoginSuccess(done, email, password) {
    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({email, password})
        .end((error, response) => {
            response.should.have.status(200);
            response.header.should.have.property("auth_token");
            response.body.should.be.a("object");
            response.body.should.have.property("username");
            response.body.should.have.property("email");

            token = response.header.auth_token;
            done();
        });
}

module.exports = { token };