require("../index");

const chai = require("chai");
const chaiHttp = require("chai-http");

const { url, messages, errors, user } = require("./test.config");
const route = "/auth/register";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("/POST auth/register", () => {

    it("400 Bad Request - email is invalid", (done) => {
        testInvalidInputDataCase(done, user.username, "invalidEmail", user.password);
    });

    it("400 Bad Request - username is invalid", (done) => {
        testInvalidInputDataCase(done, null, user.email, user.password);
    });

    it("400 Bad Request - password is invalid", (done) => {
        testInvalidInputDataCase(done, user.username, user.email, "invalidPassword");
    });

    it("201 Created - user created", (done) => {
        testUserRegisterSuccess(done, user.username, user.email, user.password);
    });

    it("409 Conflict - user already exists", (done) => {
        testUserAlreadyExistsCase(done, user.username, user.email, user.password);
    });

});

function testInvalidInputDataCase(done, username, email, password) {
    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ username, email, password })
        .end((error, response) => {
            testErrorCase(response, 400, new errors.BadRequestError(messages.invalidInputData));
            done();
        });
}

function testUserAlreadyExistsCase(done, username, email, password) {

    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ username, email, password })
        .end((error, response) => {
            testErrorCase(response, 409, new errors.ConflictError(messages.userAlreadyExists));
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

function testUserRegisterSuccess(done, username, email, password) {
    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ username, email, password })
        .end((error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("username");
            response.body.should.have.property("email");
            done();
        });
}