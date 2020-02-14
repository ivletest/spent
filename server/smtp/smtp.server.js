const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    secure: false,
    name: "localhost",
    banner: "spent.mail",
    size: 256,
    hideSize: false,
    authOptional: true,
    disabledCommands: []
});