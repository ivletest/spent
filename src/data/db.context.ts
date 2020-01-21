import { Pool, ClientConfig } from "pg";
import dotenv from "dotenv";
import Logger from "../api/middleware/logger";

dotenv.config();

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
        this.pool = new Pool();

        this.pool.on("error", (err, client) => {
            Logger.log(`Unexpected pool client error: ${err.message}, ${err.stack}`);
            process.exit(-1);
        });
    }

    public async query<T>(text: string, args: any[]): Promise<any> {
        const client = await this.pool.connect();
        let response: any;
        try {
            response = await this.pool.query<T>(text, args);
        } finally {
            client?.release();
        }

        return response;
    }

}
