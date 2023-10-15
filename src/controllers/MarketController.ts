import { Request, Response } from "express";
import MarketService from "../services/MarketService";

export class MarketController{

    private static service: MarketService = new MarketService();

    async index(req: Request, res: Response): Promise<any> {
        try {
            res.status(200).json({message: 'Resource Index'});
        } catch (err) {
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createProductPurchaseEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await MarketController.service.createProductPurchaseEvent(req.body)
            res.status(200).json({message: 'Product purchase event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createProductCreationEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await MarketController.service.createProductCreationEvent(req.body)
            res.status(200).json({message: 'Product creation event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createMarketCreationEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await MarketController.service.createMarketCreationEvent(req.body)
            res.status(200).json({message: 'Marketplace creation event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }
}