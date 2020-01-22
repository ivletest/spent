import bcrypt from "bcrypt";
import PasswordVO from "../../value-objects/password.vo";
import UsernameVO from "../../value-objects/username.vo";
import EmailVO from "../../value-objects/email.vo";

String.prototype.toPasswordHash = function(): PasswordVO {
    return PasswordVO.create(String(this));
};

String.prototype.toUsername = function(): UsernameVO {
    return UsernameVO.create(String(this));
};

String.prototype.toEmail = function(): EmailVO {
    return EmailVO.create(String(this));
};
