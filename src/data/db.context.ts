import { Pool, ClientConfig } from "pg";
import pgPromise from "pg-promise";
import Logger from "../api/middleware/logger";
import { pgConfig } from "../config/config";

const pgp = pgPromise({});

export default class DbContext {
    public static get(): DbContext {
        if (!DbContext.instance) {
            DbContext.instance = new DbContext();
        }

        return DbContext.instance;
    }

    private static instance: DbContext;
    // public pool: Pool;
    private db = pgp(pgConfig);

    private constructor() {
        // tslint:disable: no-console
        console.log(pgConfig.user);
        console.log(pgConfig.password);
        console.log(pgConfig.database);
        console.log(pgConfig.host);
        console.log(pgConfig.port);
    }

    public async query<T>(text: string, args: any[]): Promise<any> {
        let response: any;
        response = await this.db.query<T>(text, args);

        return response;
    }

}
