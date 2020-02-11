require("../index");

const chai = require("chai");
const chaiHttp = require("chai-http");

const { url, messages, errors, user } = require("./test.config");
const route = "/accounts";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;


describe("/GET /accounts", () => {

    it ("401 Unauthorized - user not logged in", (done) => {
        testGetAllAccounsUnauthorized(done);
    });

    it ("200 OK - get all accounts", (done) => {
        testGetAllAccounsSuccess(done);
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

function testGetAllAccounsUnauthorized(done) {
    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('auth_token', null)
        .send()
        .end((error, response) => {
            testErrorCase(response, 401, new errors.UnauthorizedError(messages.unauthorized));
            done();
        });
}

function testGetAllAccounsSuccess(done) {
    chai.request(url)
        .get(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('auth_token', user.token)
        .send()
        .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("array");
            done();
        });
}