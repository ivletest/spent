import parser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Router } from "express";
import ControllerBase from "./controllers/controller-base";
import Logger from "./middleware/logger";
import errorMiddleware from "./middleware/error.middleware";
import AuthController from "./controllers/auth.controller";

class App {
    public instance: express.Application;
    public port: number | string;
    public controllers: ControllerBase[] = [
        new AuthController("/auth")
    ];

    constructor(port: number | string) {
        this.instance = express();
        this.port = port;

        this.initializeDb();
        this.initializeMiddleware();
        this.initializeControllers();
        this.initializeErrorHandling();
    }

    public run(): void {
        this.instance.listen(this.port, () => {
            Logger.log(`Server is running on port: ${this.port}`);
        });
    }

    private initializeDb(): void {
        const i = 1;
    }

    private initializeMiddleware(): void {
        this.instance.use(cors({ credentials: true, origin: true}));
        this.instance.use(parser.urlencoded({extended: true}));
        this.instance.use(compression());
        this.instance.use(Logger.routeTrace);
    }

    private initializeControllers() {
        this.controllers.forEach((controller) => {
            this.instance.use("/api/v1", controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.instance.use(errorMiddleware);
    }
}

export default App;
