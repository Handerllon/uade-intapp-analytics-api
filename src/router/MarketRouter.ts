import { Router } from 'express';
import { MarketController } from '../controllers/MarketController';

export class MarketRouter {
    private controller: MarketController;
    private prefix: string = '/marketplace';

    constructor() {
        this.controller = new MarketController();
    }

    public routes(router: Router): void {
        router
            .get(`${this.prefix}`, this.controller.index)
            .post(`${this.prefix}/productPurchase`, this.controller.createProductPurchaseEvent)
            .post(`${this.prefix}/productCreate`, this.controller.createProductCreationEvent)
            .post(`${this.prefix}/marketplaceCreate`, this.controller.createMarketCreationEvent)
    }
}