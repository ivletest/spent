import PasswordVO from "./api/value-objects/password.vo";
import UsernameVO from "./api/value-objects/username.vo";
import EmailVO from "./api/value-objects/email.vo";

export {};

declare global {
    // Extensions
    interface String {
        toPasswordHash(): PasswordVO;
        toUsername(): UsernameVO;
        toEmail(): EmailVO;
    }
}