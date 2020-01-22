import UsernameVO from "../../api/value-objects/username.vo";
import PasswordVO from "../../api/value-objects/password.vo";
import EmailVO from "../../api/value-objects/email.vo";

class UserDto {
    public username: UsernameVO;
    public password: PasswordVO;
    public email: EmailVO;

    constructor(username: UsernameVO, password: PasswordVO, email: EmailVO) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

export default UserDto;
