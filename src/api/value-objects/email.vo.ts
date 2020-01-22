const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

class EmailVO {

    public static create(email: string) {
        if (email && regex.test(email)) {
            return new EmailVO(email);
        } else {
            throw new Error("Invalid Email");
        }
    }

    public value: string;

    private constructor(value: string) {
        this.value = value;
    }
}

export default EmailVO;
