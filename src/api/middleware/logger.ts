import { NextFunction, Request, Response } from "express";

export default class Logger {
    public static log(message: string) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }

    public static routeTrace(
        request: Request,
        response: Response,
        next: NextFunction) {
            Logger.log(`${request.method} ${request.path}`);
            next();
        }
}
