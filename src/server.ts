import App from "./api/app";
import { createConnection } from "typeorm";
import ormConfig from "./config/orm.config";
import Logger from "./api/middleware/logger";
import validateEnv from "./api/utils/validate.env";

validateEnv();

(async () => {
    try {
        await createConnection(ormConfig);
    } catch (error) {
        Logger.log(`Error connecting to database. error: ${error}`);
        return error;
    }

    const { PORT = 3000 } = process.env;
    const app = new App(PORT);

    app.run();

})();
