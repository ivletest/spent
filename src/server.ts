import App from "./api/app";
// import { createConnection } from "typeorm";
import Logger from "./api/middleware/logger";
import validateEnv from "./api/utils/validate.env";

validateEnv();

(async () => {
    const { PORT = 3000 } = process.env;
    const app = new App(PORT);

    app.run();

})();
