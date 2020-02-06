require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const host = `${process.env.HOST}:${process.env.PORT}`;

chai.use(chaiHttp);
chai.should();

// SUCESS TESTS
describe("/POST auth/register", () => {
    const userEmail = `test${Math.floor(Math.random() * 89999) + 10000}@email.com`;
    const userPassword = "Testpass0";
    let authToken = "";

    // Create random user
    it("Should return status 201", (done) => {

        const registerUserRequest = {
            username: "test user",
            email: userEmail,
            password: userPassword
        }

        chai.request(host)
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

    //Login user
    it("Should return status 200", (done) => {

        const loginUserRequest = {
            email: userEmail,
            password: userPassword
        }

        chai.request(host)
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
    
    //Logout user

    //Remove user
});