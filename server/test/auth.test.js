require("../index");
const server = require("../server").server;
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

// User data
const userName = "Test user."
const userEmail = `test${Math.floor(Math.random() * 89999) + 10000}@email.com`;
const userPassword = "Testpass0";
let authToken = "";

describe("/POST auth/register", () => {
    it("Should create user and return status 201 if user with the email doesn't exist", (done) => {

        const registerUserRequest = {
            username: userName,
            email: userEmail,
            password: userPassword
        }

        chai.request(server.url)
            .post("/auth/register")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(registerUserRequest)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a("object");
                response.body.should.have.property("username");
                response.body.should.have.property("email");
                done();
            });
    });

    it("Should return status 409 - Conflict if user with the email already exists, even if username is different", (done) => {

        const registerUserRequest = {
            username: `${userName}-22`,
            email: userEmail,
            password: userPassword
        }

        chai.request(server.url)
            .post("/auth/register")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(registerUserRequest)
            .end((error, response) => {
                response.should.have.status(409);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

});

describe("/POST auth/login", () => {
    it("Should log in user and return status 200", (done) => {
        const loginUserRequest = {
            email: userEmail,
            password: userPassword
        }

        chai.request(server.url)
            .post("/auth/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(loginUserRequest)
            .end((error, response) => {
                response.should.have.status(200);
                response.header.should.have.property("auth_token");
                response.body.should.be.a("object");
                response.body.should.have.property("username");
                response.body.should.have.property("email");

                authToken = response.header.auth_token;
                done();
            });
    });
});