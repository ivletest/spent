import { Guid } from "guid-typescript";

export interface IExpence {
    Id: number;
    Uid: Guid;
    Amount: number;
    AccountFK: number;
    ProductCategoryFK: number;
    CreatedOn: Date;
    UpdatedOn: Date;
    DeletedOn: Date;
}
