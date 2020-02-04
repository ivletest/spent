const restify = require("restify-clients");

const client = restify.createJsonClient({
    version: "*",
    url: `${process.env.HOST}:${process.env.PORT}`
})

describe("Register user test", () => {
    it("Should return status 201", (done) => {
        client.post("/auth/register", {
            uername: "test user",
            email: "test@email.com",
            password: "Testpass0"
        },
            (error, request, response, data) => {
                if (error) {
                    throw new Error(error);
                }

                if (data.code !== 201) {
                    throw new Error("Invlid response code.");
                }

                done();
            });
    });
});