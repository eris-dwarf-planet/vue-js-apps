import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as errorHandler from "errorHandler";
import * as methodOverride from "method-override";

import { IndexRoute } from "./routes/index";
import { TodoRoute } from "./routes/todo";
import * as config from "../config/application";

import http = require("http");
const debug = require("debug")("express:server");

export class Application {

    public static create(): Application {
        return new Application();
    }

    private app: express.Application;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.setupExpress();
        this.setupMiddleware();
        this.routes();
    }

    public run(): void {
        this.server = http.createServer(this.app);
        this.server.listen(this.normalizePort(config.default.port));
        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);
    }

    private setupExpress(): void {
        this.app.set("port", this.normalizePort(config.default.port));
    }

    private onError(error: any): void {
        if (error.syscall !== "listen") {
            throw error;
        }

        const port = this.normalizePort(config.default.port);
        const bind = typeof port === "string" ?
            "Pipe " + port :
            "Port " + port;

        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening(): void {
        // const addr = this.server.address();
        // const bind = typeof addr === "string" ?
        //     "pipe " + addr :
        //     "port " + addr.port;
        debug("Listening on " + this.server);
    }

    private normalizePort(val: any): number {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            return 5000;
        }
        if (port >= 0) {
            return port;
        }
        return 5000;
    }

    private setupMiddleware(): void {
        this.app.use(express.static(path.join(__dirname, "../../public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(methodOverride());

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }

    private routes(): void {
        this.app.use("/", IndexRoute.routes());
        this.app.use("/todos", TodoRoute.routes());
    }

}
