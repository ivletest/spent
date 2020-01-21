import PasswordVO from "./value-objects/password.vo";
import UsernameVO from "./value-objects/username.vo";

export {};

declare global {
    // Extensions
    interface String {
        toPasswordHash(): PasswordVO;
        toUsername(): UsernameVO;
    }
}