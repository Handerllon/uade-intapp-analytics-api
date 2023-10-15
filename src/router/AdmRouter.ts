import { Router } from 'express';
import { AdmController } from '../controllers/AdmController';

export class AdmRouter {
    private controller: AdmController;
    private prefix: string = '/adm';

    constructor() {
        this.controller = new AdmController();
    }

    public routes(router: Router): void {
        router
            .get(`${this.prefix}`, this.controller.index)
            .post(`${this.prefix}/userCreation`, this.controller.createUserCreationEvent)
            .post(`${this.prefix}/userAuthentication`, this.controller.createUserAuthEvent)
    }
}