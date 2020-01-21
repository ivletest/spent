import { Guid } from "guid-typescript";

export interface IUser {
    Id: number;
    Uid: Guid;
    Name: string;
    PasswordHash: string;
    CreatedOn: Date;
    UpdatedOn: Date;
    DeletedOn: Date;
}
