import { Router } from 'express';
import { CoreContController } from '../controllers/CoreContController';

export class CoreContRouter {
    private controller: CoreContController;
    private prefix: string = '/coreCont';

    constructor() {
        this.controller = new CoreContController();
    }

    public routes(router: Router): void {
        router
            .get(`${this.prefix}`, this.controller.index)
            .post(`${this.prefix}/purchase`, this.controller.createPurchaseEvent)
    }
}