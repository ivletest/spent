// tslint:disable: variable-name
import { Column, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public _id!: number;

    @Generated("uuid")
    public uid!: string;

    @Column()
    public user_name!: string;

    @Column()
    public password_hash!: string;

    @Column()
    public created_on!: Date;

    @Column()
    public updated_on?: Date;

    @Column()
    public deleted_on?: Date;
}

export default User;
