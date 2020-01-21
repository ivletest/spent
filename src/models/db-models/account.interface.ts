import { Guid } from "guid-typescript";

export interface IAccount {
    Id: number;
    Uid: Guid;
    Private: boolean;
    ParentAccountFK: number;
    UserAccount_FK: number;
    CreatedOn: Date;
    UpdatedOn: Date;
    DeletedOn: Date;
}
