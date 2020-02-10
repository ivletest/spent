require("../index");

const chai = require("chai");
const chaiHttp = require("chai-http");

const { url, messages, errors, user } = require("./test.config");
const route = "/auth/register";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("/POST auth/register", () => {
    
    it ("400 Bad Request - invalid verification user uid", (done) => {

    });
});

function testInvalidVerificationDataCase(done, userUid, emailUid) {
    chai.request(url)
        .patch(route)
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((error, response) => {
            testErrorCase(response, 400, new errors.BadRequestError(messages.invalidInputData));
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