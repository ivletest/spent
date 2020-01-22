import UsernameVO from "../../value-objects/username.vo";
import PasswordVO from "../../value-objects/password.vo";

class UserDto {
    public username: UsernameVO;
    public password: PasswordVO;

    constructor(username: UsernameVO, password: PasswordVO) {
        this.username = username;
        this.password = password;
    }
}

export default UserDto;
