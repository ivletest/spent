require("../index");
// const server = require("../server").server;
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

const url = `${process.env.HOST}:${process.env.PORT}`;

// User data
const userName = "Test user."
const userEmail = `test${Math.floor(Math.random() * 89999) + 10000}@email.com`;
const userPassword = "Testpass0";
let token = "";

describe("/POST auth/register", () => {

    it("Should return status 400 - Bad Request if email is invalid", (done) => {

        const registerUserRequest = {
            username: `${userName}`,
            email: "invalidEmail",
            password: userPassword
        }

        chai.request(url)
            .post("/auth/register")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(registerUserRequest)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

    it("Should return status 400 - Bad Request if username is invalid", (done) => {

        const registerUserRequest = {
            username: null,
            email: userEmail,
            password: userPassword
        }

        chai.request(url)
            .post("/auth/register")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(registerUserRequest)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

    it("Should return status 400 - Bad Request if password is invalid", (done) => {

        const registerUserRequest = {
            username: `${userName}`,
            email: userEmail,
            password: "invalidpassword"
        }

        chai.request(url)
            .post("/auth/register")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(registerUserRequest)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

    it("Should return 201 - Created if user with the email doesn't exist", (done) => {

        const registerUserRequest = {
            username: userName,
            email: userEmail,
            password: userPassword
        }

        chai.request(url)
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

    it("Should return 409 - Conflict if user with the email already exists, even if username is different", (done) => {

        const registerUserRequest = {
            username: `${userName}-22`,
            email: userEmail,
            password: userPassword
        }

        chai.request(url)
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

    it("Should return status 400 - Bad Request if email is invalid", (done) => {
        const loginUserRequest = {
            email: null,
            password: userPassword
        }

        chai.request(url)
            .post("/auth/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(loginUserRequest)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

    it("Should return status 400 - Bad Request if password is invalid", (done) => {
        const loginUserRequest = {
            email: userEmail,
            password: null
        }

        chai.request(url)
            .post("/auth/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(loginUserRequest)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

    it("Should return status 400 - Bad Request if user does not exist", (done) => {
        const loginUserRequest = {
            email: `notExisting${userEmail}`,
            password: userPassword
        }

        chai.request(url)
            .post("/auth/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(loginUserRequest)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

    it("Should return status 400 - Bad Request if passwords do not match", (done) => {
        const loginUserRequest = {
            email: userEmail,
            password: "someOtherValidPassword22"
        }

        chai.request(url)
            .post("/auth/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(loginUserRequest)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a("object");
                response.body.should.have.property("code");
                response.body.should.have.property("message");
                done();
            });
    });

    it("Should return 200 - OK and return auth_token in the header", (done) => {
        const loginUserRequest = {
            email: userEmail,
            password: userPassword
        }

        chai.request(url)
            .post("/auth/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(loginUserRequest)
            .end((error, response) => {
                response.should.have.status(200);
                response.header.should.have.property("auth_token");
                response.body.should.be.a("object");
                response.body.should.have.property("username");
                response.body.should.have.property("email");

                token = response.header.auth_token;
                done();
            });
    });
});

module.exports = {
    token
};