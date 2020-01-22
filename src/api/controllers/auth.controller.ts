import { Request, Response } from "express";
import ControllerBase from "./controller-base";
import UserRepository from "../../data/repository/user.repo";
import { IUserRequest } from "../../models/user/user.req";
import UserDto from "../../models/user/user.dto";
import Logger from "../middleware/logger";
import "../utils/extensions/string.extensions";

class AuthController extends ControllerBase {
    private repository: UserRepository;

    constructor(path: string) {
        super(path);
        this.repository = new UserRepository();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(this.path, this.createUserAsync.bind(this));
    }

    private async createUserAsync(req: Request, res: Response): Promise<void> {
        const body = req.body as IUserRequest;

        const userDto = new UserDto(
            body.username.toUsername(),
            body.password.toPasswordHash(),
            body.email.toEmail()
        );

        try {
            await this.repository.createUserAsync(userDto);
            res.status(201);
            res.send("User created");
        } catch (err) {
            Logger.log(err);
            res.status(500);
            res.send(err);
            return;
        }
    }
}

export default AuthController;
