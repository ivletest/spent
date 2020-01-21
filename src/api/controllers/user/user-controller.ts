import { Request, Response } from "express";
import "../../../extensions/string.extensions";
import IRegisterUser from "../../../models/requests/register-user.model";
import ControllerBase from "../controller-base";
import UserRepository from "../../../data/repository/user.repo";

export default class UserController extends ControllerBase {
    public userRepository: UserRepository;

    constructor(path: string) {
        super(path);
        this.initRoutes();
        this.userRepository = new UserRepository();
    }

    private initRoutes() {
        this.router.post(this.path, this.createUser.bind(this));
    }

    private createUser(req: Request, res: Response): void {
        const body = req.body as IRegisterUser;

        const username = body.username.toUsername();
        const password = body.password.toPasswordHash();

        this.userRepository.addUser(username, password);

        res.send({
            username: username.value,
            passwordHash: password.hashValue,
            saltValue: password.saltValue
        });
    }
}
