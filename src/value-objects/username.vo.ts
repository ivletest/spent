export default class UsernameVO {
    public static create(username: string) {
        if (username && /[a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/g.test(username)) {
            return new UsernameVO(username);
        } else {
            throw new Error("Invalid Username");
        }
    }

    public value: string;

    private constructor(value: string) {
        this.value = value;
    }
}
