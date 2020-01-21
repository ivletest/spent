import express, { Router } from "express";

export default class ControllerBase {
    public path: string;
    public router: Router;

    constructor(path: string) {
        this.path = path;
        this.router = express.Router();
    }
}
