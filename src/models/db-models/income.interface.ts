import { Guid } from "guid-typescript";

export interface IIncome {
    Id: number;
    Uid: Guid;
    Amount: number;
    AccountFK: number;
    CreatedOn: Date;
    UpdatedOn: Date;
    DeletedOn: Date;
}
