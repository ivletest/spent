import { cleanEnv, str, port } from "envalid";

function validateEnv() {
    cleanEnv(process.env, {
        PG_USER: str(),
        PG_PASSWORD: str(),
        PG_HOST: str(),
        PG_PORT: port(),
        PG_DATABASE: str()
    });
}

export default validateEnv;
