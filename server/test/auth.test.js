const supertest = require("supertest");
const should = require("should");

const server = supertest.agent(`${process.env.HOST}:${process.env.PORT}`);

describe("Register user success test", (done) => {
    it("Should return status 201 and username and email in the body", 
    (done) => {
        server.post("/auth/register")
            .send({ 
                uername: "test user", 
                email: "test@email.com", 
                password: "Testpass0"})
            .expect(201)
            .end((error, response) => {
                response.status.should.equal(201);
                response.body.should.equal({ 
                    username: "test user",
                    email: "test@email.com"});
                done();
            });
    });
});