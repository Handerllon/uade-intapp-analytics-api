import { Request, Response } from "express";
import AdmService from "../services/AdmService";

export class AdmController{

    private static service: AdmService = new AdmService();

    async index(req: Request, res: Response): Promise<any> {
        try {
            res.status(200).json({message: 'Resource Index'});
        } catch (err) {
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createUserCreationEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await AdmController.service.createUserCreationEvent(req.body)
            res.status(200).json({message: 'Internal user creation event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }

    async createUserAuthEvent(req: Request, res: Response): Promise<any> {
        try {
            const result = await AdmController.service.createUserAuthEvent(req.body)
            res.status(200).json({message: 'Internal user authentication event creation successful'});
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'An error ocurred: ' + err.message});
        }
    }
}