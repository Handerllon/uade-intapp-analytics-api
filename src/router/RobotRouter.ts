import { Router } from 'express';
import { RobotController } from '../controllers/RobotController';

export class RobotRouter {
    private controller: RobotController;
    private prefix: string = '/robots';

    constructor() {
        this.controller = new RobotController();
    }

    public routes(router: Router): void {
        router
            .get(`${this.prefix}`, this.controller.index)
            .post(`${this.prefix}/delivery`, this.controller.createRobotDeliveryEvent)
    }
}