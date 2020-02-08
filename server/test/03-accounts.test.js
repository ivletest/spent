require("../index");

const chai = require("chai");
const chaiHttp = require("chai-http");

const { url, messages, errors } = require("./test.config");
const token = require("./02-login.test").token;
const route = "/accounts";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;



describe("/GET /accounts", () => {
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

function testGetAllAccounsSuccess(done) {
    chai.request(url)
        .post(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('auth_token', token)
        .send()
        .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            done();
        });
}