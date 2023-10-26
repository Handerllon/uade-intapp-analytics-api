import { Router } from 'express';
import { DeepRacerAnalysisController } from '../controllers/DeepRacerAnalysisController'
import { logUploadMiddleware, metricUploadMiddleware, simtraceUploadMiddleware } from './middleware/middlewareFileUpload'

export class DeepRacerAnalysisRouter {
    private controller: DeepRacerAnalysisController;
    private prefix: string = '/deepracer-analysis';

    constructor() {
        this.controller = new DeepRacerAnalysisController();
    }

    public routes(router: Router): void {
        router
            .get(`${this.prefix}/training`, this.controller.index)
            .post(`${this.prefix}/logs`, logUploadMiddleware.single('log-file'), this.controller.upload)
            .post(`${this.prefix}/metrics`, metricUploadMiddleware.single('metric-file'), this.controller.upload)
            .post(`${this.prefix}/sim-trace`, simtraceUploadMiddleware.single('sim-trace-file'), this.controller.upload)
    }
}
