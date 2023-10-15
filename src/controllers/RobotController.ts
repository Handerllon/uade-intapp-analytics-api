import { Request, Response } from "express";
import RobotService from "../services/RobotService";

export class RobotController{

    private static service: RobotService = new RobotService();

    async index(req: Request, res: Response): Promise<any> {
        try {
            res.status(200).json({message: 'Resource Index'});
        } catch (err) {
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createRobotDeliveryEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await RobotController.service.createRobotDeliveryEvent(req.body)
            res.status(200).json({message: 'Delivery event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createRobotStatusEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await RobotController.service.createRobotStatusEvent(req.body)
            res.status(200).json({message: 'Status event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }
}