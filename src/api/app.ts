import parser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Router } from "express";
import ControllerBase from "./controllers/controller-base";
import Logger from "./middleware/logger";
import UserController from "./controllers/user/user-controller";
import errorMiddleware from "./middleware/error.middleware";

class App {
    public instance: express.Application;
    public port: number | string;
    public controllers: ControllerBase[] = [
        new UserController("/users")
    ];

    constructor(port: number | string) {
        this.instance = express();
        this.port = port;
    }

    public initializeDb(): void {
        throw new Error("Not implemented");
    }

    public initializeMiddleware(): void {
        this.instance.use(cors({ credentials: true, origin: true}));
        this.instance.use(parser.urlencoded({extended: true}));
        this.instance.use(compression());
        this.instance.use(Logger.routeTrace);
    }

    public initializeControllers() {
        this.controllers.forEach((controller) => {
            this.instance.use("/api/v1", controller.router);
        });
    }

    public initializeErrorHandling(): void {
        this.instance.use(errorMiddleware);
    }

    public run(): void {
        this.instance.listen(this.port, () => {
            Logger.log(`Server is running on port: ${this.port}`);
        });
    }
}

export default App;
