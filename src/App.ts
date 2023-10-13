import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from "body-parser"
import * as cors from 'cors';
import path = require('path');
import { RobotRouter } from './router/RobotRouter';
import * as AWS from 'aws-sdk'
import { AwsManager } from './CloudIntegrator';

class App {

    public app: express.Application;

    public corsOptions: cors.CorsOptions;

    public router: express.Router;

    constructor() {
        // set variables
        this.app = express();
        this.router = express.Router();

        // config envirnoment file
        dotenv.config({
            path: path.resolve(__dirname, '../.env')
        });

        // setting uses
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // initialize AWS resources
        const awsManager: AwsManager = new AwsManager()
        awsManager.initialize()

        // initialize routes
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.app.use(bodyParser.json());

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(`Received ${req.method} request from ${req.ip} to ${req.originalUrl}`);
            next(); // Continue processing the request
        });

        this.app.use('/api/v1/', this.router)
        new RobotRouter().routes(this.router)
    }

    public listen(): void {
        this.app.listen();
    }
}

export default new App().app;

