import bcrypt from "bcrypt";

export default class PasswordVO {
    public static create(password: string): PasswordVO {
        if (password && password.trim().length >= 6) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            return new PasswordVO(hash, salt);
        } else {
            throw new Error("Invalid Password");
        }
    }

    public hashValue: string;
    public saltValue: string;

    private constructor(hashValue: string, saltValue: string) {
        this.hashValue = hashValue;
        this.saltValue = saltValue;
    }
}
