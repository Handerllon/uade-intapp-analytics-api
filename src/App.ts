import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import path = require('path');
import { DataSource } from 'typeorm';

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

        // initialize resources
        this.initializeRoutes();

        // initialize data source
        //const datasource: DataSource =  getDataSource();
        //datasource.initialize();
    }

    private initializeRoutes() {
        this.app.use('/api/v1/', this.router)
    }

    public listen(): void {
        this.app.listen();
    }
}

export default new App().app;

