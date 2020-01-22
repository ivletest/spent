import { IUser } from "../../models/db-models/user.interface";
import { users } from "../Sql/index.sql";
import DbContext from "../db.context";
import UserDto from "../DTOs/user.dto";

export default class UserRepository {
    public async addUser(user: UserDto): Promise<IUser> {
        const queryString = `INSERT INTO app_user (
                                user_name,
                                password_hash,
                                created_on,
                                updated_on,
                                deleted_on)
                            VALUES ($1, $2, NOW(), NULL, NULL)`;

        return await DbContext.get()
            .query<IUser>(queryString, [user.username.value, user.password.hashValue]);
    }
}
