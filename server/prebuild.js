const db = require("./db/models/index");
const childProcess = require("child_process");

//Sync Database
db.sequelize.sync({
    force: process.env.DATABASE_FORCE_REBUILD
});

if (process.env.NODE_ENV !== "production") {
    childProcess.exec("npx sequelize-cli db:seed:all", (error, stdout, stderr) => {
        if (error) {
            console.log(`exec error: ${error}`);
        }
        console.log(stdout);
        console.log(stderr);

        process.exit(0);
    });
}