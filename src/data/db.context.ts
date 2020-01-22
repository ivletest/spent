import { Pool, ClientConfig } from "pg";
import pgPromise from "pg-promise";
import Logger from "../api/middleware/logger";
import { pgConfig } from "../config/config";

export default class DbContext {
    public static get(): DbContext {
        if (!DbContext.instance) {
            DbContext.instance = new DbContext();
        }

        return DbContext.instance;
    }

    private static instance: DbContext;
    public pool: Pool;

    private constructor() {
        this.pool = new Pool(pgConfig);
    }
}
