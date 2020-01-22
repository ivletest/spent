import { Request, Response } from "express";
import "../../utils/extensions/string.extensions";
import IRegisterUser from "../../../models/requests/register-user.model";
import ControllerBase from "../controller-base";
import UserDto from "../../../data/DTOs/user.dto";
import UserRepository from "../../../data/repository/user.repo";

export default class UserController extends ControllerBase {
    private repository: UserRepository;

    constructor(path: string) {
        super(path);
        this.initRoutes();
        this.repository = new UserRepository();
    }

    private initRoutes() {
        this.router.post(this.path, this.createUser.bind(this));
    }

    private createUser(req: Request, res: Response): void {
        const body = req.body as IRegisterUser;

        const userDto = new UserDto(
            body.username.toUsername(),
            body.password.toPasswordHash()
        );

        this.repository.addUser(userDto)
            .then((response) => {
                res.send(response);
            });
        // res.send({
        //     username: userDto.username.value,
        //     passwordHash: userDto.password.hashValue,
        //     saltValue: userDto.password.saltValue
        // });
    }
}
