import { Guid } from "guid-typescript";

export interface IProductCategory {
    Id: number;
    Uid: Guid;
    Name: string;
    ParentCategoryFK: number;
    Order: number;
    CreatedOn: Date;
    UpdatedOn: Date;
    DeletedOn: Date;
}
