// import { Request, Response } from "express";
// import "../../utils/extensions/string.extensions";
// import { IUserRequest } from "../../../models/user/user.req";
// import ControllerBase from "../controller-base";
// import UserDto from "../../../models/user/user.dto";
// import UserRepository from "../../../data/repository/user.repo";
// import Logger from "../../middleware/logger";

// export default class UserController extends ControllerBase {
//     private repository: UserRepository;

//     constructor(path: string) {
//         super(path);
//         this.initRoutes();
//         this.repository = new UserRepository();
//     }

//     private initRoutes() {
//         this.router.post(this.path, this.createUserAsync.bind(this));
//     }

//     private async createUserAsync(req: Request, res: Response): Promise<void> {
//         const body = req.body as IUserRequest;

//         const userDto = new UserDto(
//             body.username.toUsername(),
//             body.password.toPasswordHash()
//         );

//         try {
//             await this.repository.createUserAsync(userDto);
//             res.status(201);
//             res.send("User created");
//         } catch (err) {
//             Logger.log(err);
//             res.status(500);
//             res.send(err);
//             return;
//         }
//     }
// }
