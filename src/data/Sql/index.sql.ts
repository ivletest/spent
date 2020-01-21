import path from "path";
import { IQueryFileOptions, QueryFile } from "pg-promise";

export function sql(file: string): QueryFile {

    const fullPath: string = path.join(__dirname, file);

    const options: IQueryFileOptions = {
        minify: true
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        throw new Error(`Error executing sql file ${fullPath}.`);
    }

    return qf;
}

export const users = {
    create: sql("./User/user.insert.sql"),
    getByUid: sql("user.get-by-uid.sql")
};
