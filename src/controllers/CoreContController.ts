import { Request, Response } from "express";
import CoreContService from "../services/CoreContService";

export class CoreContController{

    private static service: CoreContService = new CoreContService();

    async index(req: Request, res: Response): Promise<any> {
        try {
            res.status(200).json({message: 'Resource Index'});
        } catch (err) {
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createPurchaseEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await CoreContController.service.createPurchaseEvent(req.body)
            res.status(200).json({message: 'Purchase event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }
}