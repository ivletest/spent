import DbContext from "../db.context";
import UserDto from "../../models/user/user.dto";

export default class UserRepository {
    public async createUserAsync(user: UserDto): Promise<void> {
        const db = DbContext.get();
        const client = await db.pool.connect();

        try {
            const createUserQuery = `INSERT INTO app_user (
                                    user_name,
                                    password_hash,
                                    password_salt)
                                VALUES ($1, $2, $3)
                                RETURNING _id`;

            const createEmailQuery = `INSERT INTO email (
                                    address,
                                    app_user_FK,
                                    is_primary)
                                VALUES ($1, $2, $3)`;

            const res = await client.query(createUserQuery, [
                user.username.value,
                user.password.hashValue,
                user.password.saltValue
            ]);
            await client.query(createEmailQuery, [
                "karakan@protonmail.com",
                res.rows[0]._id,
                true]);

            await client.query("COMMIT");
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }
}
